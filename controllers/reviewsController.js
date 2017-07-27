const db = require('../models')
const bodyParser = require('body-parser')

function reviewsIndex (req, res) {
  console.log('reviewsController Working')
}

function reviewsCreate (req, res ) {
  let newReview = req.body
  db.Recipe.findById(req.params._id, function (recipe) {

  })

}

module.exports = {
  reviewsIndex: reviewsIndex,
  reviewsCreate: reviewsCreate
}
