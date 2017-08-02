from theapp import myapp
from theapp import socketio
from flask import render_template
from flask import session
from flask_socketio import emit
from flask_socketio import join_room, leave_room
import json

room_history = {}
room_history["general"] = []

@myapp.route('/')
def index():
    return render_template('splash.html')

@myapp.route('/chat/<chat_room>')
def chat_room(chat_room):
    return render_template('ChatAppPage.html')

@myapp.route('/dashboard')
def dashboard():           
    return render_template('dashboard.html', rooms=list(room_history.keys()))

@myapp.route('/getFileName')
def get_file_name():
    return 'static/content/connected.mp3'

@socketio.on('message')
def on_message(json):
    print('received something chat:' + str(json))
    room = json['room']        
    room_history[str(room)].append(json)
    emit('message response', json, room=room)
    if ( len(room_history[str(room)]) > 25 ):
        room_history[str(room)].pop(0)

@socketio.on('createroom')
def on_create_room(json):
    room_name = str(json['room'])
    if room_name not in room_history:
        room_history[room_name] = []
        #emit('new room msg', json)

@socketio.on('join')
def on_join(json):
    alias = json['alias']
    room = json['room'] 
    room_name = str(json['room'])

    join_room(room)
    emit('join response', json, room=room)
    if ( len(room_history[room_name]) == 0 ):
        if (room_name == 'general'):
            emit('general room msg', json)
        else:
            emit('new room msg', json)
    else:
        emit('history req', json)
        for item in room_history[room_name]:
            emit('message response', item)
