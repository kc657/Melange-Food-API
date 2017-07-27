const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Review = require('./review')

const RecipeSchema = new Schema({
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

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe
