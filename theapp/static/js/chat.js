var socket = io.connect();
var alias = sessionStorage.getItem("alias");
socket.on('connect', function(){
	socket.emit('event', {
		data: alias + ' Connected'
	});
});


socket.on ('my response', function(msg){
	console.log(msg);
	alertify.set('notifier','position', 'top-right');
	alertify.success(String(msg.data));

	var audio = document.getElementById('sound');
        audio.src = '../static/content/connected.mp3';
        audio.load();
        audio.oncanplaythrough = function() {
            this.play();
        }
});

var form = $('form').on('submit', function ( event ){
	// to allow for when the user hits enter
	event.preventDefault();
	var message   = $('input.message').val();

	socket.emit( 'chat', {
		user : alias,
		msg : message
	});

	console.log(alias, message);

	//Empty field

});


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

chosen_color= getRandomColor();



// Capture Message
socket.on('chat', function( msg ){
	// FIX THIS msg.user
	if( typeof msg.user !== 'undefined' ){
		$('h1').remove();
		$('div.message_holder').append('<div class="message_roll"><b style="color:' + chosen_color + '">' + msg.user + ': </b>' + msg.msg + '</div>' );
		$('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
		// clear textbox
		$('#chatinputbox').val('');
	}
});