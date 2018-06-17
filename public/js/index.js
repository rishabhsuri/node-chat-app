var socket = io();
socket.on('connect', () => {
	console.log('Connected to the server');

});

socket.on('newMessage', function(mssg) {
	console.log('Recieved Message', mssg);
	var formattedTime=moment(mssg.createdAt).format('h:mm a');
	var li = jQuery('<li></li>');
	li.text(`${mssg.from} ${formattedTime}: ${mssg.text}`);
	jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(mssg){
	var formattedTime=moment(mssg.createdAt).format('h:mm a');
	var li=jQuery('<li></li>');
	var a=jQuery('<a target="_blank">My current location</a>')
	li.text(`${mssg.from} ${formattedTime}: `);
	a.attr('href',mssg.url);
	li.append(a);
	jQuery('#messages').append(li);
});

socket.on('disconnect', function() {
	console.log('Disconnected from the server');
});

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	var messageTextBox=jQuery('[name=message]');
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextBox.val()
	}, function() {
		messageTextBox.val('');
	});
});

var locationButton = jQuery("#send-location");
locationButton.on('click', function() {
	if (!navigator.geolocation) {
		return alert('Geolocation is not supported by your browser');
	}
	locationButton.attr('disabled','disabled').text('Sending location...');
	navigator.geolocation.getCurrentPosition(function(position){
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
		console.log(position);
	},function(e){
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch browser')
	});
});