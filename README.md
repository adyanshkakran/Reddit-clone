# Reddit clone

This is a Reddit Clone created using the MERN stack for the course DASS for Spring Semester 2023 at IIIT Hyderabad. The frontend has been made using React and Typescript using vite while the backend is a basic Express.js server and a MongoDB database on the cloud. The whole project has been dockerized and can be run using docker-compose.

## Run instructions
1. Clone the repository.
2. Run `sudo docker-compose up -d --build` in the root directory. To check for errors and logs, you can run `sudo docker-compose logs -f`.
3. The website will be available at `localhost:3000`.
4. To stop the server, run `sudo docker-compose down`. 


### Assumptions - 
1. If a user leaves a SubGreddit, he can still send a send request to the SubGreddit. This is because leaving should be temporary and not permanent.
2. A user cannot make a post that contains a bannedk keyword in the title but anything in the content is notified to the creator and replaced with *s.
3. Pressing the Ignore Button for a report deletes the report because that is what ignoring a report means.


### Bonus Features -
1. Keyboard Shortcuts
2. Fuzzy Search