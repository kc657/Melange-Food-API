let mongoose = require('mongoose')
mongoose.connect('mongod://localhost/recipe')

let Recipe = require('./recipe.js')
let Review = require('./review.js')

module.exports.Recipe = Recipe
module.exports.Review = Review
