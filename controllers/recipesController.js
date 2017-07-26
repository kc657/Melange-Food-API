const db = require('../models')
const bodyParser = require('body-parser')

function recipesIndex (req, res) {
  db.Recipe.find({}, function (err, allRecipes) {
    res.json(allRecipes)
  })
}

function recipesCreate (req, res) {
  console.log('hitting recipes create controller')
  console.log()
}

function recipesDestroy (req, res) {
  db.Recipe.findOneAndRemove({ _id: req.params.recipeId }, function(err, foundRecipe){
    console.log('the recipe that is deleted is ' + foundRecipe)
    res.json(foundRecipe)
  })
}


module.exports = {
  recipesIndex: recipesIndex,
  recipesCreate: recipesCreate,
  recipesDestroy: recipesDestroy
}
