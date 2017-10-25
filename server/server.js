const path = require('path')
const express = require('express')
const app = express()

let server = require('http').Server(app)

// instance of socket.io
const io = require('socket.io')(server)

// PORT variable
const port = process.env.PORT || 3000
// static folder
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

// socket work. Connection emit the event when find a new connection
io.on('connection', (socket) => {
  console.log('New user connected')

  socket.emit('newMessage', {
    from: 'admin',
    text: 'Welcome to the chat app'
  })

  socket.broadcast.emit('newMessage', {
    from: 'admin',
    text: 'New User Join'
  })

  // Listen for createMessage event
  socket.on('createMessage', (message) => {
    console.log('createMessage on', message)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
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
