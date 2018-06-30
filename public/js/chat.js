var socket = io();

function scrollToBottom() {
	// Selectors
	var messages = jQuery("#messages");
	var newMessage = messages.children('li:last-child');
	// Heights
	var scrollTop = messages.prop("scrollTop");
	var scrollHeight = messages.prop("scrollHeight");
	var clientHeight = messages.prop("clientHeight");
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		console.log("Should scroll");
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', function() {
	var params = jQuery.deparam(window.location.search);

	socket.emit('join', params, function(err) {
		if (err) {
			alert(err);
			window.location.href='/';
		} else {
			console.log('No error');
		}
	});
});

socket.on('newMessage', function(mssg) {
	var formattedTime = moment(mssg.createdAt).format('h:mm a');
	var template = jQuery("#message-template").html();
	var html = Mustache.render(template, {
		text: mssg.text,
		from: mssg.from,
		createdAt: formattedTime,


	});
	jQuery('#messages').append(html);
	scrollToBottom();
	// console.log('Recieved Message', mssg);
	// var formattedTime=moment(mssg.createdAt).format('h:mm a');
	// var li = jQuery('<li></li>');
	// li.text(`${mssg.from} ${formattedTime}: ${mssg.text}`);
	// jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(mssg) {
	var formattedTime = moment(mssg.createdAt).format('h:mm a');
	var template = jQuery("#location-message-template").html();
	var html = Mustache.render(template, {
		createdAt: formattedTime,
		from: mssg.from,
		url: mssg.url
	});
	jQuery('#messages').append(html);
	scrollToBottom();
	// var formattedTime=moment(mssg.createdAt).format('h:mm a');
	// var li=jQuery('<li></li>');
	// var a=jQuery('<a target="_blank">My current location</a>')
	// li.text(`${mssg.from} ${formattedTime}: `);
	// a.attr('href',mssg.url);
	// li.append(a);
	// jQuery('#messages').append(li);
});

socket.on('disconnect', function() {
	console.log('Disconnected from the server');
});

socket.on('updateUserList',function(users){
	var ol=jQuery('<ol></ol>');

	users.forEach( function(user) {
		ol.append(jQuery('<li></li>').text(user));
	});

	jQuery('#users').html(ol);
});

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	var messageTextBox = jQuery('[name=message]');
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
	locationButton.attr('disabled', 'disabled').text('Sending location...');
	navigator.geolocation.getCurrentPosition(function(position) {
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
		console.log(position);
	}, function(e) {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch browser')
	});
});