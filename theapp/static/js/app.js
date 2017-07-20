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


var form = $( 'form').on('submit', function ( event ){
	// to allow for when the user hits enter
	event.preventDefault();
	var user_name = $('input.username').val();
	var message   = $('input.message').val();

	socket.emit( 'event', {
		user : user_name,
		msg : message
	});

	console.log(user_name, message);

});



// Capture Message
socket.on('my response', function( msg ){
	// FIX THIS msg.user
	if( typeof msg !== 'undefined' ){
		$('h1').remove();
		$('div.message_holder').append('<div class="message_roll"><b>' + msg.user + ': </b>' + msg.msg + '</div>' );
	}
})

 $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);