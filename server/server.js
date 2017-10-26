const path = require('path')
const express = require('express')
const app = express()

let server = require('http').Server(app)

// instance of socket.io
const io = require('socket.io')(server)

const { Users } = require('./utils/users')
// import of generator of message
const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation')

let users = new Users()
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
      return callback('Name and room name are required')
    }
    // Join for rooms
    socket.join(params.room)
    users.removeUser(socket.id) // clean an array of the posibble twice id
    users.addUser(socket.id, params.name, params.room) // adding a new user

    io.to(params.room).emit('update-userList', users.getUserList(params.room))

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
    socket.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined`))

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
    let user = users.removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('update-userList', users.getUserList(user.room))
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
    }
  })
})

// Running server
server.listen(port, () => {
  console.log(`App is served in port ${port}`)
})
