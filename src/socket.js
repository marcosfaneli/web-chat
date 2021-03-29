const http = require('http')
const socket = require('socket.io')

const app = require('./app')
const server = http.createServer(app)
const io = socket.listen(server)

const connections = []

io.sockets.on('connection',(socket) => {

   connections.push(socket)

   console.log(socket.id)

   io.sockets.emit('logon:id', socket.id)

   console.log(' %s sockets is connected', connections.length)

   socket.on('disconnect', () => {
      connections.splice(connections.indexOf(socket), 1)
   })

   socket.on('sending message', (message) => {
      const listen = `message:${message.id}`

      console.log(`Id User: ${message.id} - Socket: ${socket.id}`)

      io.sockets.emit(listen, {message: message.message, id: message.id})
      io.sockets.emit('message:public', {message: "mensagem publica"})
   })
})

module.exports = server
