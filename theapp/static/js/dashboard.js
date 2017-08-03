var alias = sessionStorage.getItem("alias");
document.getElementById("alias-banner").innerHTML = "Alias: " + alias;

$('#back_to_login').on('click', function () {
    linkLocation = "/";
    $("body").fadeOut(1000, redirectPage);
    function redirectPage() {
        window.location = "/";
    }
});

$(window).on('load', function () {
    $('#table tr').eq(1).addClass('selected');
})

$(document).on('click', 'table #table-rows', function () {
    $("#table #table-rows").removeClass('selected');
    $(this).addClass('selected')
});

$('#join_room').on('click', function () {
    var room = String($("#table tr.selected td:nth-child(2)").html());
    linkLocation = "/chat/" + String(room);
    $("body").fadeOut(1000, redirectPage);
    function redirectPage() {
        window.location = linkLocation;
    }
});

function generateTable(rooms, users) {
    var roomsArray = rooms.split(',')
    var usersArray = users.split(',')
    var tbody = document.getElementById('table');
    for (var i = 0; i < roomsArray.length; i++) {
        var tr = "<tr id='table-rows'>";
        tr += "<td>" + parseInt(i + 1) + "</td>" + "<td>" + roomsArray[i].replace(/[\[\]'\s]/g, '') + "</td>" + "<td>" + usersArray[i].replace(/[\[\]'\s]/g, '') + "</td>" +"</tr>";
        tbody.innerHTML += tr;
    }
}

var form = $('form#create-chatroom').on('submit', function (event) {
    event.preventDefault();
    var alias = sessionStorage.getItem("alias");
    room = $('input.room').val().toLowerCase();

    var user = {
        alias: alias
    }

    socket.emit('createroom', {
        room: room
    });

    flag = false;
    for (var key in user) {
        if (user[key] == false) {
            $form.addClass('animated shake').one(animationEnd, function () {
                $(this).removeClass('animated shake');
            });
            flag = true;
        }
    }

    if (flag == false) {
         linkLocation = "/chat/" + String(room);
         window.location = linkLocation;
    
    }
    if (typeof (Storage) !== "undefined") {
        sessionStorage.setItem("alias", user.alias)
        console.log(sessionStorage.getItem("alias"));
    }
});

function wait_link() {
    linkLocation = "/chat/" + String(room);
    $("body").fadeOut(1000, redirectPage);
    function redirectPage() {
        window.location = linkLocation;
    }
}
