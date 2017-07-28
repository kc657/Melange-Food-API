
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

// get recipes
app.get('/api/recipes', controllers.recipe.recipesIndex)

// get recipes by id
app.get('/api/recipes/:recipeId', controllers.recipe.show)

// get specific recipe reviews
app.get('/api/recipes/:recipeId/reviews', controllers.review.reviewsIndex)

// create new recipe
app.post('/api/recipes', controllers.recipe.recipesCreate)

// create new review for recipe
app.post('/api/recipes/:recipeId/reviews', controllers.review.reviewsCreate)

// edit recipe
app.put('/api/recipes/:recipeId', controllers.recipe.recipesEdit)

// delete recipe
app.delete('/api/recipes/:recipeId', controllers.recipe.recipesDestroy)

/**********
 * SERVER *
 **********/
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/')
})
