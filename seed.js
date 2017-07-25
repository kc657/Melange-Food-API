const db = require('./models')

let sampleReviews = []
let sampleRecipes = []

sampleReviews.push({
  name: 'Kevin',
  wouldRecommend: true
})
sampleReviews.push({
  name: 'Mary',
  wouldRecommend: false
})

sampleRecipes.push({
  name: 'Chicken Fried Rice',
  url: 'www.google.com',
  imgUrl: 'https://www.gimmesomeoven.com/wp-content/uploads/2014/03/Fried-Rice-7.jpg',
  publisher: 'Kevin\'s Kitchen',
  yield: 2,
  calories: 800,
  reviews: [Review.schema]
})
