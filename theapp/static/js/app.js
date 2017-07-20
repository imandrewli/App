var socket = io.connect();
socket.on('connect', function(){
	socket.emit('event', {
		data: 'User Connected'
	});
});

	//capture message 
socket.on ('my response', function(msg){
	console.log(msg);
})


var form = $('form').on('submit', function ( event ){
	// to allow for when the user hits enter
	event.preventDefault();
	var user_name = $('input.username').val();
	var message   = $('input.message').val();

	socket.emit( 'event', {
		user : user_name,
		msg : message
	});

	console.log(user_name, message);

	//Empty field

});

// Capture Message
socket.on('my response', function( msg ){
	if( typeof msg.user !== 'undefined' ){
		$('h1').remove();
		$('div.message_holder').append('<div class="message_roll"><b>' + msg.user + ': </b>' + msg.msg + '</div>' );
	}
})