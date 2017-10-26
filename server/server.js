const path = require('path')
const express = require('express')
const app = express()

let server = require('http').Server(app)

// instance of socket.io
const io = require('socket.io')(server)

// import of generator of message
const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation')

// PORT variable
const port = process.env.PORT || 3000
// static folder
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

// socket work. Connection emit the event when find a new connection
io.on('connection', (socket) => {
  console.log('New user connected')
  // Listen for Join event
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required')
    }
    // Join for rooms
    socket.join(params.room)
    // socket.leave('name of room')
    // io.emit --> io.to(name of room).emit
    // socket.broadcast.emit --> socket.to('name of room').emit

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
    socket.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} user joined`))

    callback()
  })

  // Listen for createMessage event
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage on', message)
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('')
  })

  socket.on('create-location', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  // Listen a disconnect event when client close the page
  socket.on('disconnect', () => {
    console.log('User disconnected from server')
  })
})

// Running server
server.listen(port, () => {
  console.log(`App is served in port ${port}`)
})
