# HissChat App


Hello! If you would like to know how to start this app please follow the instructions below.
The following prerequistes are required to be installed prior to attempting the app. 
(It is assumed you do not have the correct libraries installed, if you do, please skip all installation steps):

- Python 3 must be installed on your system.


------------------------------------------------------

1. Clone the repo into the filesystem of your choice.
	$ git clone <url>

2. Upon cloning the repo, open a terminal window into the repository and run:
	$ pip install virtualenv
	(if you already have virtualenv skip this step)

3. Once installed run the command:
	$ virtualenv envx

4. Then run envx to activate the virtual environment:

	On unix: source envx/Scripts/activate 
	On windows: envx\Scripts\activate

	Once envx activated you should see the following output: $ (envx) 

5. Now run:

 	$ pip install Flask

6. Now run:

	$ pip install flask-socketio

7. Now run

	$ pip install eventlet

8. Now start the app:

	$ python run.py

9. Navigate to localhost:5000
