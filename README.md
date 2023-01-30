# Reddit clone

To run the frontend server, run ```npm run dev``` in the frontend directory.

The backend is hosted on Render.com and you do not need to run it on your local machine to run this project.
* I have used JWTs to authenticate users and protect the routes for a machine who is not logged in.
* The JWTs are initialized and authenticated in the Express backend.
* Have used localStorage to implement `Keep User Logged in` functionality.