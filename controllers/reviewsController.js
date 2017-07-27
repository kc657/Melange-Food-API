const db = require('../models')
const bodyParser = require('body-parser')

function reviewsIndex (req, res) {
  console.log('reviewsController Working');
}

module.exports = {
  reviewsIndex: reviewsIndex
}
