const mongoose = require('mongoose')
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/recipe')

const Recipe = require('./recipe.js')
const Review = require('./review.js')

module.exports.Recipe = Recipe
module.exports.Review = Review
