var socket = io();
socket.on('connect', () => {
	console.log('Connected to the server');

});

socket.on('newMessage', function(mssg) {
	console.log('Recieved Message', mssg);

	var li = jQuery('<li></li>');
	li.text(`${mssg.from}: ${mssg.text}`);
	jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(mssg){
	var li=jQuery('<li></li>');
	var a=jQuery('<a target="_blank">My current location</a>')
	li.text(`${mssg.from}: `);
	a.attr('href',mssg.url);
	li.append(a);
	jQuery('#messages').append(li);
});

socket.on('disconnect', function() {
	console.log('Disconnected from the server');
});

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function() {

	});
});

var locationButton = jQuery("#send-location");
locationButton.on('click', function() {
	if (!navigator.geolocation) {
		return alert('Geolocation is not supported by your browser');
	}
	navigator.geolocation.getCurrentPosition(function(position){
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
		console.log(position);
	},function(e){
		alert('Unable to fetch browser')
	});
});