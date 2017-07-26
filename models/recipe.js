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
  ingredients: [String],
  reviews: [Review.schema]
})

let Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe
