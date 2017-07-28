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

function recipesDestroy (req, res) {
  const recipeId = req.params.recipeId
  db.Recipe.findOneAndRemove({ _id: recipeId}, function (err, foundRecipe) {
    console.log('the recipe that is deleted is ' + foundRecipe)
    res.json(foundRecipe)
  })
}

function recipesEdit (req, res) {
  const recipeId = req.params.recipeId
  db.Recipe.findById({ _id: recipeId}, function (err, foundRecipe) {
    if (err) return res.status(500).json(err)
    console.log(req.body.name)
    foundRecipe.name = req.body.name
    foundRecipe.save(function (err, savedRecipe) {
      if (err) { console.log('did not save recipe changes') }
      res.json(savedRecipe)
    })
  })
}

module.exports = {
  recipesIndex: recipesIndex,
  recipesCreate: recipesCreate,
  recipesDestroy: recipesDestroy,
  recipesEdit: recipesEdit,
  show: show
}
