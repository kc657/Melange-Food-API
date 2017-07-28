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
  const recipe_id = req.params.recipe_id
  db.Recipe.findOneAndRemove({ _id: recipe_id}, function (err, foundRecipe) {
    console.log('the recipe that is deleted is ' + foundRecipe)
    res.json(foundRecipe)
  })
}

function recipesEdit(req, res) {
  const recipe_id = req.params.recipe_id
  db.Recipe.findById(recipe_id, function(err, foundRecipe) {
    if (err) return res.status(500).json(err)
    foundRecipe.name = req.body.name
    foundRecipe.save(function (err, savedRecipe) {
      if (err) {console.log('did not save recipe changes')}
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
