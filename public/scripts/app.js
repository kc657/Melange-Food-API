console.log('Sanity Check')

$(document).ready(function () {
  $('#submit-ingredients').on('submit', function (doc) {
    doc.preventDefault()
    getRecipes()
  })
  $.ajax({
    method: 'GET',
    url: '/api/recipes',
    success: function (recipes) {
      recipes.forEach(renderSeedRecipes)
    },
    error: function (err) {
      throw err
    }
  })

  // delete recipe when its delete button is clicked
  $('#recipes').on('click', '.delete-recipe', handleDeleteRecipeClick)
})

// when a delete button for a specific recipe is clicked
function handleDeleteRecipeClick (e) {
  let recipeId = $(this).parents('.recipe').data('recipe-id')
  console.log(`Try and delete me now ${recipeId}`)
  $.ajax({
    url: '/api/recipes/' + recipeId,
    method: 'DELETE',
    success: handleDeleteRecipeSuccess
  })
}

// callback function after DELTE /api/albums/:id
function handleDeleteRecipeSuccess (data) {
  let deletedRecipeId = data._id
  console.log(`you are deleting ${deletedRecipeId}`)
  $('div[data-recipe-id=' + deletedRecipeId + ']').remove()
}

function getRecipes () {
  $.ajax({
    method: 'GET',
    url: 'https://api.edamam.com/search',
    data: $('form').serialize(),
    dataType: 'json',
    success: postEdamamRecipes,
    error: getApiRecipesError
  })
}

function postEdamamRecipes (recipes) {
  // let edamamIngredients = recipes.hits[0].recipe.ingredientLines
  // let formatIngredients = renderIngredient(edamamIngredients)
  // console.log(formatIngredients);
  let edamamApiRecipe = {
    name: recipes.hits[0].recipe.label,
    calories: recipes.hits[0].recipe.calories,
    healthLabels: recipes.hits[0].recipe.healthLabels,
    source: recipes.hits[0].recipe.source,
    sourceUrl: recipes.hits[0].recipe.url,
    imgUrl: recipes.hits[0].recipe.image,
    ingredients: recipes.hits[0].recipe.ingredientLines
  }
  $.ajax({
    method: 'POST',
    url: '/api/recipes',
    data: edamamApiRecipe,
    success: renderEdamamRecipes,
    error: function () {
      console.log('Recipe posting failed')
    }
  })
}

function renderEdamamRecipes (recipe) {
  let recipeHtml = (`
      <div class='row recipe'>
        <div class='col-md-10 col-md-offset-1'>
          <div class='panel panel-default'>
            <div class='panel-body'>

             <!-- begin recipe internal row -->
              <div class='row'>
                <div class='col-md-3 col-xs-12 thumbnail recipe-image'>
                  <img src='${recipe.imgUrl}' alt='recipe image'>
                </div>

                <div class='col-md-9 col-xs-12'>
                  <ul class='list-group'>
                    <li class='list-group-item'>
                      <h4 class='inline-header'>Recipe Name:</h4>
                      <span class='recipe-name'>${recipe.name}</span>
                    </li>

                    <li class='list-group-item'>
                      <a href='${recipe.sourceUrl}'> via ${recipe.source}</a>
                    </li>

                    <li class='list-group-item'>
                      <h4 class='inline-header'>Ingredients:</h4>
                      <ul>${recipe.ingredients}</ul>
                    </li>

                  </ul>
                </div>
                <!-- end of recipe internal row -->

                <div class='panel-footer'>
                <button type='button' class='btn btn-primary delete-recipe'>Delete Recipe</button>
                </div>

              </div>
            </div>
          </div>
        </div>
        <!-- end of one recipe -->
      `)
  $('#recipes').prepend(recipeHtml)
}

function getApiRecipesError () {
  console.log('Get Recipes Error')
}

function renderReview (review) {
  return (`<span> ${review.author} ${review.wouldRecommend} </span>`)
}

// takes seed recipes and renders it on the page
function renderSeedRecipes (recipe) {
  recipe.reviewsHtml = recipe.reviews.map(renderReview)
  let ingredientList = renderIngredient(recipe.ingredients)
  let recipeHtml = (`
    <div class='row recipe' data-recipe-id='${recipe._id}'>
      <div class='col-md-10 col-md-offset-1'>
        <div class='panel panel-default'>
          <div class='panel-body'>

           <!-- begin recipe internal row -->
            <div class='row'>
              <div class='col-md-3 col-xs-12 thumbnail recipe-image'>
                <img src='${recipe.imgUrl}' alt='recipe image'>
              </div>

              <div class='col-md-9 col-xs-12'>
                <ul class='list-group'>
                  <li class='list-group-item'>
                    <h4 class='inline-header'>Recipe Name:</h4>
                    <span class='recipe-name'>${recipe.name}</span>
                  </li>

                  <li class='list-group-item'>
                    <a href='${recipe.sourceUrl}'> via ${recipe.source}</a>
                  </li>

                  <li class='list-group-item'>
                    <h4 class='inline-header'>Ingredients:</h4>
                    <ul>${ingredientList}</ul>
                  </li>

                  <li class='list-group-item'>
                    <h4 class='inline-header'>Reviews:</h4>
                    <ul>${recipe.reviewsHtml}</ul>
                  </li>

                </ul>
              </div>
              <!-- end of recipe internal row -->

              <div class='panel-footer'>
              <button type='button' class='btn btn-primary add-review'>Add Review</button>
              <button type='button' class='btn btn-danger delete-recipe'>Delete Recipe</button>
              </div>

            </div>
          </div>
        </div>
      </div>
      <!-- end of one recipe -->
    `)
  $('#recipes').prepend(recipeHtml)
}

function renderIngredient (ingredients) {
  let ingredientHtml = ''
  ingredients.forEach(function (e) {
    ingredientHtml += (`
        <li class='ingredient' id='ingredient'>${e}</li>
      `)
  })
  return ingredientHtml
}
