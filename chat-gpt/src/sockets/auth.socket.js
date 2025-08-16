const {Server} = require('socket.io');

function setupSocketServer(httpServer) {
	const io = new Server(httpServer,{});

	io.on('connection',(socket)=>{

		console.log('server is connected.');


		socket.on('disconnect',(socket)=>{
			console.log('server is disconnected.')
		})
	})
}

module.exports = setupSocketServer;