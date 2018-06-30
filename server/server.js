const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {Users}=require('./utils/users');

const {generateMessage,generateLocationMessage}=require('./utils/message');
const {isRealString}=require('./utils/validation');
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

const port = process.env.PORT || 3000;

const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users=new Users();

app.use(express.static(publicPath));

io.on('connection', function(socket) {
	console.log("New user connected");

	socket.on('join',(params,callback)=>{
		if(!isRealString(params.name) || !isRealString(params.room))
			return callback('Name and room name are required');

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id,params.name,params.room);

		// socket.leave('My fans');

		// io.emit -> io.to('My fans').emit;
		// socket.broadcast.emit -> socket.broadcast.to('My fans').emit;
		// socket.emit

		io.to(params.room).emit('updateUserList',users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} joined`));

		callback();
	});

	socket.on('createMessage', (mssg,callback) =>{
		var user=users.getUser(socket.id);
		if(user && isRealString(mssg.text)){
		io.to(user.room).emit('newMessage', generateMessage(user.name,mssg.text));
	}
		callback();
	});

	socket.on('createLocationMessage',(coords)=>{
		var user=users.getUser(socket.id);
		if(user){
		io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude, coords.longitude));
		console.log(coords);
	}
	});

	socket.on('disconnect', function(){
		console.log("The user disconnected");
		var user=users.removeUser(socket.id);
		io.to(user.room).emit('updateUserList',users.getUserList(user.room));
		io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left.`));
	});
});

server.listen(port, () => console.log(`The server is up on port ${port}`));