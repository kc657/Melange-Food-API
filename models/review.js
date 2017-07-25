let mongoose = require('mongoose')
let Schema = mongoose.Schema

let ReviewSchema = new Schema({
  author: String,
  date: Number,
  wouldRecommend: Boolean
})

let Review = mongoose.model('Review', ReviewSchema)

module.exports = Review
