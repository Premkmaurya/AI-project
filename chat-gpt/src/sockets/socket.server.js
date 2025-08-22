const {Server} = require('socket.io');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model')
const generateResponse = require('../services/ai.service')
const messageModel = require('../models/message.model')

function setupSocketServer(httpServer) {
	const io = new Server(httpServer,{});

    io.use( async (socket,next)=>{
    	const getToken = cookie.parse(socket.handshake.headers.cookie || '')
    	if (!getToken) {
    		return res.status(400).json({
    			message:"anautarised"
    		})
    	}

    	try{
            const decoded = jwt.verify(getToken.token,process.env.JWT_SECRET)
            const user = await userModel.findOne({
            	_id:decoded.id
            })
            socket.user = user;
            next()

    	} catch(err){
            console.log("error occured",err)
    	}
    })

	io.on('connection',(socket)=>{

		socket.on('ai-message',async(messagePayload)=>{
			
            await messageModel.create({
            	chat:messagePayload.chatId,
            	user:socket.user._id,
            	content:messagePayload.content,
            	role:"user"
            })

            const chatHistory = (await messageModel.find({
                      chat:messagePayload.chatId
              }).sort({createdAt:-1}).limit(20).lean()).reverse()


			const response = await generateResponse(chatHistory.map(item=>{
				return {
					role:item.role,
					parts:[{text:item.content}]
				}
			}))
			
			socket.emit('ai-response',{
               content:response,
               chatId:messagePayload.chatId
			})

			await messageModel.create({
            	chat:messagePayload.chatId,
            	user:socket.user._id,
            	content:response,
            	role:"model"
            })

		})

		socket.on('disconnect',(socket)=>{
			console.log('server is disconnected.')
		})
	})
}

module.exports = setupSocketServer;