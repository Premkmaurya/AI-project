require('dotenv').config();
const app = require('./src/app')
const connectDb = require('./src/db/db')
const setupSocketServer = require('./src/sockets/auth.socket');
const http = require('http')

const httpServer = http.createServer(app)

setupSocketServer(httpServer)
connectDb()

httpServer.listen(3000,()=>{
	console.log('server is listen at prot 3000.')
})