#!flask/bin/python
from theapp import myapp
from theapp import socketio

myapp.config.update(
    SECRET_KEY = 'asbuicfbeygd875dswwudb'
)
socketio.run ( myapp, debug = True )