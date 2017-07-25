let db = require('../models')

let sampleRecipes = [
  {
    name: 'Chicken Fried Rice',
    url: 'www.google.com',
    imgUrl: 'https://www.gimmesomeoven.com/wp-content/uploads/2014/03/Fried-Rice-7.jpg',
    publisher: 'Kevin\'s Kitchen',
    yield: 2,
    calories: 800
  // reviews: [Review.schema]
  },
  {
    name: 'Chicken Fried Rice 2',
    url: 'www.google.com',
    imgUrl: 'https://www.gimmesomeoven.com/wp-content/uploads/2014/03/Fried-Rice-7.jpg',
    publisher: 'Mary\'s Kitchen',
    yield: 3,
    calories: 1100
// reviews: [Review.schema]
  }
]

function recipesIndex (req, res) {
  db.Recipe.find({}, function(err, allRecipes) {
    res.json(allRecipes)
  })
}

module.exports = {
  recipesIndex: recipesIndex
}
