
const express = require('express')
const app = express()
const bodyParser = require('body-parser')



// serve static :files from public folder
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}))

const controllers = require('./controllers')

// database
const db = require('./models')


// homepage route
app.get('/', function homepage (req, res) {
  res.sendFile('views/index.html', ({root: __dirname}))
})

// routes
app.get('/api', controllers.api.index)

/**********
 * SERVER *
 **********/
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/')
})
//
// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })