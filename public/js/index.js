var socket = io();
socket.on('connect', () => {
	console.log('Connected to the server');

});

socket.on('newMessage', function(mssg) {
	console.log('Recieved Message', mssg);

	var li=jQuery('<li></li>');
	li.text(`${mssg.from}: ${mssg.text}`);
	jQuery('#messages').append(li);
});

socket.on('disconnect', function() {
	console.log('Disconnected from the server');
});

jQuery('#message-form').on('submit',function(e){
	e.preventDefault();

	socket.emit('createMessage',{
		from:'User',
		text: jQuery('[name=message]').val()
	},function(){

	});
});