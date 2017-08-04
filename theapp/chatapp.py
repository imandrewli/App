from theapp import myapp
from theapp import socketio
from flask import render_template
from flask import session
from flask_socketio import emit, join_room, leave_room, close_room

MAX_ROOM_SIZE = 100

room_history = {}
room_history["general"] = []
room_users = {}
room_users["general"] = []

@myapp.route('/')
def index():
    return render_template('splash.html')

@myapp.route('/chat/<chat_room>')
def chat_room(chat_room):
    return render_template('ChatAppPage.html')

@myapp.route('/dashboard')
def dashboard():
    numUsers = []
    sortedRooms = sorted(list(room_history.keys()))

    for item in sortedRooms:
        numUsers.append(len(room_users[item]))
    
    return render_template('dashboard.html', rooms=sortedRooms, users=numUsers)

@myapp.route('/getFileName')
def get_file_name():
    return 'static/content/connected.mp3'
    
@socketio.on('message')
def on_message(json):
    print('received something chat:' + str(json))
    room = json['room']
    room_history[str(room)].append(json)
    emit('message response', json, room=room)
    if len(room_history[str(room)]) > 25:
        room_history[str(room)].pop(0)

@socketio.on('createroom')
def on_create_room(json):
    room_name = str(json['room'])
    room_history[room_name] = []
    room_users[room_name] = []
    if room_name not in room_history:
        room_history[room_name] = []

@socketio.on('leaveroom')
def on_leave_room(json):
    alias = str(json['alias'])
    room = json['room']
    leave_room(room)
    if alias in room_users[str(room)]: room_users[str(room)].remove(alias)
    emit(alias + ' has left the room', json, room=room)

@socketio.on('deleteroom')
def on_close_room(json):
    room = json['room']
    del room_history[str(room)]
    del room_users[str(room)]
    emit("Room is being closed, please leave", json, room=room)
    close_room(room)

@socketio.on('join')
def on_join(json):
    alias = json['alias']
    room = json['room']
    room_name = str(room)
    if len(room_users[room_name]) < MAX_ROOM_SIZE:
        join_room(room)
        room_users[room_name].append(alias)
        emit('join response', json, room=room)
        if len(room_history[room_name]) == 0:
            if room_name == 'general':
                emit('general room msg', json)
            else:
                emit('new room msg', json)
        else:
            emit('history req', json)
            for item in room_history[room_name]:
                emit('message response', item)
    else:
        print("ROOM HAS: " + str(len(room_users[room_name])))
        emit('full response', json)
