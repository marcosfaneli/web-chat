const http = require('http')
const socket = require('socket.io')

const app = require('./app')
const server = http.createServer(app)
const io = socket.listen(server)

const connections = []

io.sockets.on('connection',(socket) => {

   connections.push(socket)

   console.log(' %s sockets is connected', connections.length)

   socket.on('disconnect', () => {
      connections.splice(connections.indexOf(socket), 1)
   })

   socket.on('sending message', (message) => {
      io.sockets.emit('new message', {message: message, token: socket.id})
   })

   socket.on('login', (message) => {
      io.sockets.emit('logon', {token: socket.id});
   })
})

module.exports = server
