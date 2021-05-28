require('dotenv').config();
const Server = require('./models/server');

 
console.log("jola mundi");

const server = new Server();

server.listen();