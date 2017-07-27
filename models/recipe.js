let mongoose = require('mongoose')
let Schema = mongoose.Schema
let Review = require('./review.js')

let RecipeSchema = new Schema({
  _id: Number,
  name: String,
  url: String,
  imgUrl: String,
  source: String,
  sourceUrl: String,
  yield: Number,
  calories: Number,
  ingredients: [String],
  reviews: [Review.schema]
})

let Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe
