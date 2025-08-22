const {Server} = require('socket.io');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model')

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

		console.log(socket)


		socket.on('disconnect',(socket)=>{
			console.log('server is disconnected.')
		})
	})
}

module.exports = setupSocketServer;