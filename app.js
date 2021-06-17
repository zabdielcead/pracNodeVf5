require('dotenv').config();
const Server = require('./models/server');

 
console.log("jola mundi");
/*
mongo db compass instlamos
mongoose https://mongoosejs.com/

*/
const server = new Server();

server.listen();