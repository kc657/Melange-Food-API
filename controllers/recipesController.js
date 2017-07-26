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

module.exports = {
  recipesIndex: recipesIndex,
  recipesCreate: recipesCreate
}
