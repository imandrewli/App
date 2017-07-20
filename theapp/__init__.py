from flask import Flask, render_template
from flask_socketio import SocketIO

myapp = Flask(__name__)
socketio = SocketIO( myapp )
from theapp import chatapp