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
    from: 'test1@example.com',
    text: 'Testing emit event with socket.io'
  })

  // emitting an event new-email
  socket.on('createMessage', (message) => {
    console.log('createMessage on', message)
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
