import express from 'express';
import path from 'path';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = 3000;
server.listen(PORT);
console.log('Server is running');

const users = [];
const connections = [];

io.sockets.on('connection',(socket) => {
   connections.push(socket);
   console.log(' %s sockets is connected', connections.length);

   socket.on('disconnect', () => {
      connections.splice(connections.indexOf(socket), 1);
   });

   socket.on('sending message', (message) => {
      io.sockets.emit('new message', {message: message, token: socket.id});
   });

   socket.on('login', (message) => {
      io.sockets.emit('logon', {token: socket.id});
   });
});

app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});
