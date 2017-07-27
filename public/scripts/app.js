console.log('Sanity Check')

$(document).ready(function () {
  $('#search-ingredients').on('click', function (e) {
    e.preventDefault()
    $('#searchModal').modal('show')
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

  $('#searchRecipe').on('submit', function (e) {
    e.preventDefault()
    getRecipes()
  })

  $('#recipes').on('click', '.add-review', function (e) {
    let id = $(this).closest('.recipe').data('recipe-id')
    $('#reviewModal').data('recipe-id', id)
    $('#reviewModal').modal('show')
  })

  // catch and handle the click on add review button
  $('#recipes').on('click', '.add-review', function handleAddReviewClick (e) {
    const recipe_id = $(this).closest('.recipe').data('recipe-id')
    $('#reviewModal').data('recipe-id', recipe_id)
    $('#reviewModal').modal()
  }
)

  // //save review modal save button
  $('#saveReview').on('click', handleNewReviewSubmit)

  // delete recipe when its delete button is clicked
  $('#recipes').on('click', '.delete-recipe', handleDeleteRecipeClick)

  // transparent modal addClass functions
  $('.modal-transparent').on('show.bs.modal', function () {
    setTimeout(function () {
      $('.modal-backdrop').addClass('modal-backdrop-transparent')
    }, 0)
  })
  $('.modal-transparent').on('hidden.bs.modal', function () {
    $('.modal-backdrop').addClass('modal-backdrop-transparent')
  })
}) //end of document.ready//

// when a delete button for a specific recipe is clicked
function handleDeleteRecipeClick (e) {
  let recipeId = $(this).parents('.recipe').data('recipe-id')
  $.ajax({
    url: '/api/recipes/' + recipeId,
    method: 'DELETE',
    success: function handleDeleteRecipeSuccess (data) {
      let deletedRecipeId = data._id
      $('div[data-recipe-id=' + deletedRecipeId + ']').remove()
    }
  })
}

// getting recipe from edamam API
function getRecipes () {
  $.ajax({
    method: 'GET',
    url: 'https://api.edamam.com/search',
    data: $('form').serialize(),
    dataType: 'json',
    success: function postEdamamRecipes (recipes) {
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
    },
    error: function getApiRecipesError () {
      console.log('Get Recipes Error')
    }
  })
}

// posting recipe from API onto database
function postEdamamRecipes (recipes) {
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
                      <ul>${recipe.ingredients}</ul>
                    </li>
                    <li class='list-group-item'>
                      <h4 class='inline-header'>Reviews:</h4>
                      <ul>${recipe.reviews}</ul>
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

// takes seed recipes and renders it on the page
function renderSeedRecipes (recipe) {
  let seedReview = recipe.reviews.map(function renderReview (review) {
    return (`<span> ${review.author} ${review.wouldRecommend} </span>`)
  })
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
                    <ul>${seedReview}</ul>
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

function handleNewReviewSubmit (e) {
  const recipe_id = $('#reviewModal').data('recipe-id')
  let reviewerName = $('#reviewerName').val()
  let reviewRating = $('#recommendationRating').val()
  $.ajax({
    method: 'POST',
    url: '/api/recipes/' + recipe_id + '/reviews',
    data: {
      author: reviewerName,
      wouldRecommend: reviewRating
    },
    success: function (review) {
      console.log('Review added!')
      $.ajax({
        method: 'GET',
        url: '/api/recipes/' + recipe_id,
        success: function (recipe) {
          $(`.recipe[data-recipe-id='${recipe_id}']`).remove()
          renderEdamamRecipes(recipe)
        }
      })
    },
    error: function failedNewReview (e) {
      console.log('saved new review not working')
    }
  })
}
