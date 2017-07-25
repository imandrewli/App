from theapp import myapp
from theapp import socketio
from flask import render_template
from flask import session
from flask_socketio import emit
from flask_socketio import join_room, leave_room

room_list = []
history = []
room_dict = {}

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

    if str(json['msg']) == '\history':
        emit('history req', json, room = room)
        for item in room_dict[str(room)]:
            emit('message response', item, room=room)

    else:      
        room_dict[str(room)].append(json)
        emit('message response', json, room=room)


@socketio.on('join')
def on_join(json):
    alias = json['alias']
    room = json['room']
    join_room(room)

    print('joined room: ' + room)
    
    if room in room_dict:
        x+1
    else:
        room_dict[str(room)] = []
        print('\n room dict: ')
        print( room_dict)

    
    emit('join response', json, room=room)

    emit('history req', json, room = room) # I cant get this line to display anything in the chat room.
    # for item in room_dict[str(room)]:
    #     emit('message response', item, room=room)
           
    