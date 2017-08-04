var socket = io.connect();
var alias = sessionStorage.getItem("alias");
socket.on('connect', function () {
    var path = window.location.pathname.split('/');
    room = path[2];
    socket.emit('join', {
        alias: alias,
        room: room
    });
    document.getElementById("chat_room_name").innerHTML = room.replace(/%20/g,'');

    document.getElementById("alias-banner").innerHTML = "Alias: " + alias;
});

//Capture users joining
socket.on('join response', function (msg) {
    if (typeof alertify !== 'undefined') {
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(String(msg.alias) + " has joined the room");   
    }

    var audio = document.getElementById('sound');
    if (audio) {
        audio.src = '../static/content/connected.mp3';
        audio.load();
        audio.oncanplaythrough = function () {
            this.play();
        }
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



var form = $('form').on('submit', function (event) {
    // to allow for when the user hits enter
    event.preventDefault();
    var message = $('input.message').val();
    var path = window.location.pathname.split('/');
    room = path[2];

    socket.emit('message', {
        alias: alias,
        msg: message,
        color: chosen_color,
        room: room
    });
    $('#chatinputbox').val('');
});

$(window).on('resize', function () {
    $('#chatbox').css('max-height', $(window).height() - 150);
});

// Capture new messages
socket.on('message response', function (msg) {
    if (typeof msg.alias !== 'undefined') {
        $('h1').remove();
        $('div.message_holder').append('<div class="message_roll"><b style="color:' + msg.color + '">' + msg.alias + ': </b>' + msg.msg + '</div>');
        $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
        $('#chatbox').css('max-height', $(window).height() - 150);
    }
});

// Full room msg
socket.on('full response', function( msg ){
    $('h1').remove();
    $('div.message_holder').append('<div class="message_roll"><b style="color:' + '000000' + '">' + 'Room is full, try again later' + '</div>' );
    $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
    $('#chatbox').css('max-height', $(window).height() - 150);
});

// History readout
socket.on('history req', function( msg ){
    $('h1').remove();
    $('div.message_holder').append('<div class="message_roll"><b style="color:' + '000000' + '">' + msg.room + '\'s ' + 'past 25 messages...' + '</div>' );
    $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
    $('#chatbox').css('max-height', $(window).height() - 150);
});

// New room msg
socket.on('new room msg', function( msg ){
    $('h1').remove();
    $('div.message_holder').append('<div class="message_roll"><b style="color:' + '000000' + '">' + 'Welcome to the new room \'' + msg.room + '\'!' + '</div>' );
    $('div.message_holder').append('<div class="message_roll"><b style="color:' + '000000' + '">' + 'There is no history to display yet.' + '</div>' );
    $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
    $('#chatbox').css('max-height', $(window).height() - 150);
});

// general room msg
socket.on('general room msg', function( msg ){
    $('h1').remove();
    $('div.message_holder').append('<div class="message_roll"><b style="color:' + '000000' + '">' + 'Welcome to the general chatroom!' + '</div>' );
    $('div.message_holder').append('<div class="message_roll"><b style="color:' + '000000' + '">' + 'There is no history to display yet.' + '</div>' );
    $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
    $('#chatbox').css('max-height', $(window).height() - 150);
});

//when the back to dashboard is clicked
$('#back_to_dashboard').on('click', function () {
    linkLocation = "/dashboard";
    $("body").fadeOut(1000, redirectPage);
    socket.emit('leaveroom', {
        alias: alias,
        room: room
    });
    function redirectPage() {
        window.location = linkLocation;
    }
});

window.onbeforeunload = function(){
    socket.emit('leaveroom', {
        alias: alias,
        room: room
    });
};