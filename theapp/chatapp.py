from theapp import myapp
from theapp import socketio
from flask import render_template
from flask_socketio import emit


@myapp.route( '/' )
def index():
	return render_template ( 'splash.html' )

@myapp.route('/Chat/')
def chat():
	return render_template ('ChatAppPage.html')

@myapp.route('/getFileName')
def getFileName():
    return 'static/content/connected.mp3'

@socketio.on ( 'event' )
def handle_my_custom_event( json ):
	print('received something:' + str(json) );
	alias = str(json)
	socketio.emit ('my response', json, broadcast=True);

@socketio.on ( 'chat' )
def handle_my_custom_event( json ):
	print('received something:' + str(json) );
	alias = str(json)
	socketio.emit ('chat', json, broadcast=True);