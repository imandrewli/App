from theapp import myapp
from theapp import socketio
from flask import render_template
from flask_socketio import emit


@myapp.route( '/' )
def index():
	return render_template ( 'ChatAppPage.html' )

@socketio.on ( 'event' )
def handle_my_custom_event( json ):
	print('received something:' + str(json) );
	socketio.emit ('my response', json , broadcast=True);