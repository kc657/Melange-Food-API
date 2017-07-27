const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  author: String,
  wouldRecommend: Boolean
})

const Review = mongoose.model('Review', ReviewSchema)

module.exports = Review
