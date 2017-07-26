const db = require('../models')
const bodyParser = require('body-parser')

function recipesIndex (req, res) {
  db.Recipe.find({}, function (err, allRecipes) {
    res.json(allRecipes)
  })
}

function show (req, res) {
  db.Recipe.findById(req.params.recipeId, function (err, foundRecipe) {
    if (err) { console.log('Cannot find the recipe') }
    res.json(foundRecipe)
  })
}

function recipesCreate (req, res) {
  const newRecipe = req.body
  db.Recipe.create(newRecipe, function (err, recipe) {
    if (err) return res.status(500).json(err)
    res.json(recipe)
  })
}

module.exports = {
  recipesIndex: recipesIndex,
  recipesCreate: recipesCreate,
  show: show
}
