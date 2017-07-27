const db = require('../models')
const bodyParser = require('body-parser')

function reviewsIndex (req, res) {
  console.log('reviewsController Working')
}

function reviewsCreate (req, res) {
  db.Recipe.findById(req.params.currentRecipeId, function (err, foundRecipe) {
    let newReview = req.body
    console.log(newReview)
  })
}

module.exports = {
  reviewsIndex: reviewsIndex,
  reviewsCreate: reviewsCreate
}
