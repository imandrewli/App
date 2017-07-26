from theapp import myapp
from theapp import socketio
from flask import render_template
from flask import session
from flask_socketio import emit
from flask_socketio import join_room, leave_room
import json

room_dict = {}
room_list = set()
@myapp.route('/')
def index():
    return render_template('splash.html')

@myapp.route('/chat/<chat_room>')
def chat_room(chat_room):
    return render_template('ChatAppPage.html')

@myapp.route('/dashboard/')
def dashboard():
    global room_dict
    global room_list
    for key, value in room_dict.items():
        room_list.add(str(value))        
    return render_template('dashboard.html', rooms=list(room_list))

@myapp.route('/getFileName')
def get_file_name():
    return 'static/content/connected.mp3'

@socketio.on('message')
def on_message(json):
    print ('received something chat:' + str(json))
    room = json['room']
    print (room)
    emit('message response', json, room=room)

@socketio.on('join')
def on_join(json):
    global room_dict
    alias = json['alias']
    room = json['room']
    if room in room_dict:
        pass
    else:
        print "swoop"
        #do not add lobby room
        if (len(room) != 0):
            room_dict[str(alias)] = room
    print ("<<[")
    for key, value in room_dict.items():
        print (key, value)
    print ("]>>")

    join_room(room)
    emit('join response', json, room=room)
