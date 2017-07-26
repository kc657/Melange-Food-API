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

sampleRecipes.push({
  name: 'Teriyaki Chicken',
  url: 'http://www.davidlebovitz.com/chicken-teriyaki-recipe-japanese-farm-food/',
  imgUrl: 'https://www.edamam.com/web-img/c8e/c8e021a608c2f51b6af1e20e6d58fb3b.jpg',
  source: 'David Lebovitz',
  sourceUrl:'http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html',
  yield: 6,
  calories: 906,
  ingredients:[
    "1/2 cup (125ml) mirin",
    "1/2 cup (125ml) soy sauce",
    "One 2-inch (5cm) piece of fresh ginger, peeled and grated",
    "2-pounds (900g) boneless chicken thighs (4-8 thighs, depending on size)"]
  // reviews: [Review.schema]
})

sampleRecipes.push({
  name: 'Chicken Piccata',
  url: 'http://norecipes.com/recipe/chicken-piccata-recipe',
  imgUrl: 'https://www.edamam.com/web-img/eb5/eb5985a8a19a9fc72b0cf627282199ed.jpg',
  source: 'No Recipes',
  sourceUrl:'http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html',
  yield: 2,
  calories: 1685,
  ingredients:[
    "2 large chicken breasts",
    "1/2 cup flour",
    "3 tbsps vegetable oil",
    "2 scallions white part only, minced",
    "3 tbsps lemon juice",
    "1 cup chicken stock",
    "1 tsp honey",
    "2 tbsps unsalted butter cut into small pieces",
    "2 tbsps parsley minced",
    "2 tbsps capers",
    "1 tsp lemon zest finely zested"]
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
    process.exit();
  });
});
