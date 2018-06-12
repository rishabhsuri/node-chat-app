const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage}=require('./utils/message');

const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

const port = process.env.PORT || 3000;

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
	console.log("New user connected");

	socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

	socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

	socket.on('createMessage', (mssg,callback) =>{
		console.log("The server recieved the message", mssg);
		io.emit('newMessage', generateMessage(mssg.from,mssg.text));
		callback('This is an acknowledgment from the server');
	});

	socket.on('createLocationMessage',(coords)=>{
		io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude));
		console.log(coords);
	});

	socket.on('disconnect', function(){
		console.log("The user disconnected");
	});
});

server.listen(port, () => console.log(`The server is up on port ${port}`));