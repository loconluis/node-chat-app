let socket = io()

socket.on('connect', function () {
  console.log('Connected to server')
})

socket.on('disconnect', function () {
  console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
  console.log('newMessage on', message)
})

socket.on('user-join', function (data) {
  console.log('data', data.text)
})
