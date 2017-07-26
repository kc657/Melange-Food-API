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
  source: 'Kevin\'s Kitchen',
  sourceUrl:'http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html',
  yield: 2,
  calories: 800,
  ingredients:[
    "1/2 cup olive oil",
    "5 cloves garlic, peeled",
    "2 large russet potatoes, peeled and cut into chunks",
    "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
    "3/4 cup white wine",
    "3/4 cup chicken stock",
    "3 tablespoons chopped parsley",
    "1 tablespoon dried oregano",
    "Salt and pepper",
    "1 cup frozen peas, thawed"]
  // reviews: [Review.schema]
})

// sampleRecipes.forEach(function (recipe) {
//   recipe.reviews = sampleReviews
// })

db.Recipe.remove({}, function(err, recipes){
  // code in here runs after all albums are removed
  db.Recipe.create(sampleRecipes, function(err, recipes){
    // code in here runs after all albums are created
    if (err) { return console.log('ERROR', err); }
    console.log("all recipes:", recipes);
    process.exit();
  });
});
