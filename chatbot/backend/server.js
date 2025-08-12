require('dotenv').config();
const app = require("./src/app")
const express = require('express')
const connectDb = require('./src/db/db')
const {Server} = require('socket.io')
const {createServer} = require('http');
const main = require('./src/service/ai.service')



connectDb()
const httpServer = createServer();
const io = new Server(httpServer,{
     cors:{
          origin:"http://localhost:5173"
     }
});

const chatHistory = []


io.on('connection',(socket)=>{
     console.log('user connected.');
     socket.on('message',async (msg)=>{
     	chatHistory.push({
               role:"user",
               parts:[{
                    text:msg
               }]
          })
          const response = await main(chatHistory);
          chatHistory.push({
               role:"model",
               parts:[{
                    text:response
               }]
          })
          socket.emit('message-response',response);
     })
     socket.on('disconnect',()=>{
     	console.log('user disconnected.')
     })
})

app.get('/',(req,res)=>{
	res.send("hello world")
})



httpServer.listen(3000,()=>{
	console.log("server is listen at PORT 3000.")
})