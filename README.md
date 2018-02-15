# gigel.id_basic_skill_test
An authentication system and editable user profile example

##### This project is a full-separation of front-end and back-end where each of them run their own servers on different ports.
##### Vue.js is used on the front-end and node.js on the back-end as rest api

# Setup
You need to have Node.js (min. version 8.2.1) installed, you can download it on https://nodejs.org/en/ 

* Clone this repository to your project folder.
* open 2 terminal and go to the project folder directory. One terminal is used for run the front-end(client) and the other one for run the back-end(rest api server). 
* Run the front-end(client) and back-end(server) separatly, with the following step:

client - terminal A
```
cd client
npm install
npm run dev
```
the client should run on port 8080

server - terminal B
```
cd server
npm install
cd src
node app.js
```
the server run on port 3000

Open browser and go to localhost:8080
