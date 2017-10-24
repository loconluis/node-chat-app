const path = require('path')
const express = require('express')

const app = express()

// PORT variable
const port = process.env.PORT
// static folder
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

// Running server
app.listen(port, () => {
  console.log(`App is served in port ${port}`)
})
