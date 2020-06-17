/* 
Import Dependencies
  * express - is a framework for the server setup
  * morgan - is an HTTP request logger middleware
  * mongoose - is an Object Data Modeling (ODM) library for MongoDB. It manages relationships between data and provides schema validation
  * body-parser - extracts the entire body portion of an incoming request stream and exposes it on req.body 
  * compression - is a middleware that decreases the downloadable amount of data that’s served to users.
*/
const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const compression = require('compression')

// Initialize the express application
const app = express()

// Set up the middlewares
app.use(logger('dev'))
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Middleware that allows express to server static files to the client
app.use(express.static('public'))

// Connect to mongoDB database running remotely or locally during development
// Specify mongoDB connection option booleans
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/budget', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
})

// Import all api routes
app.use(require('./routes/api.js'))

/*
  Set's the PORT to 3000 when in local development OR to the PORT set by Heroku's environment when deployed
  The server accepts the PORT as a parameter to listen on.
*/
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`)
})
