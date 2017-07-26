let db = require('../models')

function recipesIndex (req, res) {
  db.Recipe.find({}, function(err, allRecipes) {
    res.json(allRecipes)
  })
}

function recipesCreate (req, res) {

}

module.exports = {
  recipesIndex: recipesIndex,
  recipesCreate: recipesCreate
}
