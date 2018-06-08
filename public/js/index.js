var socket = io();
socket.on('connect', () => {
	console.log('Connected to the server');

});

socket.on('newMessage', function(mssg) {
	console.log('Recieved Message', mssg);
});

socket.on('disconnect', function() {
	console.log('Disconnected from the server');
});