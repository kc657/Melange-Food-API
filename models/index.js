const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/recipe')

const Recipe = require('./recipe.js')
const Review = require('./review.js')

module.exports.Recipe = Recipe
module.exports.Review = Review
