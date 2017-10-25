let socket = io()

socket.on('connect', function () {
  console.log('Connected to server')
  // challenge 1
  socket.emit('createMessage', {
    from: 'locon',
    text: 'Hey. What is going on'
  })
})

socket.on('disconnect', function () {
  console.log('Disconnected from server')
})
// challenge 2
socket.on('newMessage', function (message) {
  console.log('newMessage on', message)
})
