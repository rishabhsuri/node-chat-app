const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

const port = process.env.PORT || 3000;

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
	console.log("New user connected");

	socket.emit('newMessage', {
			from: 'Admin',
			text: 'Welcome to the chat app',
			createdAt: new Date().getTime()
		});

	socket.broadcast.emit('newMessage',{
		from:'Admin',
		text: 'New user joined',
		createdAt: new Date().getTime() 
	});

	socket.on('createMessage', function(mssg) {
		console.log("The server recieved the message", mssg);
		io.emit('newMessage', {
			from: mssg.from,
			text: mssg.text,
			createdAt: new Date().getTime()
		})

		// socket.broadcast.emit('newMessage', {
		// 	from: mssg.from,
		// 	text: mssg.text,
		// 	createdAt: new Date().getTime()
		// })
	});

	socket.on('disconnect', function(){
		console.log("The user disconnected");
	});
});

server.listen(port, () => console.log(`The server is up on port ${port}`));