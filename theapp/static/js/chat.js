var socket = io.connect();
var alias = sessionStorage.getItem("alias");
socket.on('connect', function(){
    var path = window.location.pathname.split('/');
    room = path[2];
    socket.emit('join', {
        alias: alias,
        room:  room
    });
});

//Capture users joining
socket.on ('join response', function(msg){
    alertify.set('notifier','position', 'top-right');
    alertify.success(String(msg.alias) + " has joined the room");

    var audio = document.getElementById('sound');
        audio.src = '../static/content/connected.mp3';
        audio.load();
        audio.oncanplaythrough = function() {
            this.play();
        }
});

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var chosen_color = getRandomColor();


var form = $('form').on('submit', function ( event ){
    // to allow for when the user hits enter
    event.preventDefault();
    var message   = $('input.message').val();
    var path = window.location.pathname.split('/');
    room = path[2];

    socket.emit( 'message', {
        user : alias,
        msg : message,
        color: chosen_color,
        room: room
    });
    $('#chatinputbox').val('');
});

$(window).on('resize',function() {
    $('#chatbox').css('max-height',$(window).height() - 150);
});

// Capture new messages
socket.on('message response', function( msg ){
    if( typeof msg.user !== 'undefined' ){
        $('h1').remove();
        $('div.message_holder').append('<div class="message_roll"><b style="color:' + msg.color + '">' + msg.user + ': </b>' + msg.msg + '</div>' );
        $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
        $('#chatbox').css('max-height', $(window).height() - 150);
    }
});

// History readout
socket.on('history req', function( msg ){
    if( typeof msg.user !== 'undefined' ){
        $('h1').remove();
        $('div.message_holder').append('<div class="message_roll"><b style="color:' + '000000' + '">' + msg.room + '\'s ' + 'chat history...' + '</div>' );
        $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
        $('#chatbox').css('max-height', $(window).height() - 150);
    }
});