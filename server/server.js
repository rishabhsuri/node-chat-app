const path=require('path');
const http=require('http');
const express=require('express');
const  socketIO =require('socket.io');

const publicPath=path.join(__dirname,'../public')
console.log(publicPath);

const port=process.env.PORT||3000;

const app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	console.log("New user connected");

	socket.on('disconnect',()=>{
		console.log("The user disconnected");
	});
});

server.listen(port,()=>console.log(`The server is up on port ${port}`));