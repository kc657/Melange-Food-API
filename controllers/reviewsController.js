const db = require('../models')
const bodyParser = require('body-parser')

function reviewsIndex (req, res) {
  console.log('reviewsController Working')
}

function reviewsCreate (req, res) {
  const recipe_id = req.params.recipe_id
  console.log(recipe_id)
  db.Recipe.findById(recipe_id, function (err, recipe) {
    if (err) return res.status(500).json(err)
    if (recipe === null) return res.status(404).json({message: "didn't find the recipe."})
    db.Review.create({
      author: req.body.author,
      wouldRecommend: req.body.wouldRecommend
    }, function (err, review) {
      if (err) return res.status(500).json(err)
      console.log('hi there')
      recipe.reviews.push(review)
      recipe.save()
      res.json(review)
    })
  })
}

module.exports = {
  reviewsIndex: reviewsIndex,
  reviewsCreate: reviewsCreate
}
