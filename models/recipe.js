let mongoose = require('mongoose')
let Schema = mongoose.Schema
let Review = require('./review.js')

let RecipeSchema = new Schema({
  name: String,
  url: String,
  imgUrl: String,
  publisher: String,
  yield: Number,
  calories: Number,
  reviews: [Review.schema]
})

let Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe
