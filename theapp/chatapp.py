from theapp import myapp
from theapp import socketio
from flask import render_template
from flask import session
from flask_socketio import emit
from flask_socketio import join_room, leave_room

room_list = []

@myapp.route('/')
def index():
    return render_template('splash.html')

@myapp.route('/chat/<chat_room>')
def chat_room(chat_room):
    return render_template('ChatAppPage.html')

@myapp.route('/getFileName')
def get_file_name():
    return 'static/content/connected.mp3'

@socketio.on('message')
def on_message(json):
    print('received something chat:' + str(json))
    room = json['room']
    print(room)
    emit('message response', json, room=room)

@socketio.on('join')
def on_join(json):
    alias = json['alias']
    room = json['room']
    join_room(room)
    emit('join response', json, room=room)
    #emit(alias + ' has entered the room.', room=room)

@socketio.on('leave')
def on_leave(json):
    username = json['username']
    room = json['room']
    leave_room(room)
    #emit(username + ' has left the room.', room=room)