console.log('Sanity Check')

$(document).ready(function () {
  $.ajax({
    method: 'GET',
    url: '/api/recipes',
    success: function (recipes) {
      recipes.forEach(renderRecipes)
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
    const recipeId = $(this).closest('.recipe').data('recipe-id')
    $('#reviewModal').data('recipe-id', recipeId)
    $('#reviewModal').modal()
  })

  // save review modal save button
  $('#saveReview').on('click', handleNewReviewSubmit)

  // search modal save recipe button
  $('#recipes').on('click', '.add-recipe', postRecipes)

  // search modal save recipe button
  $('#recipes').on('click', '.close-recipe', closeRecipe)

  // edit recipe click to pop modal
  $('#recipes').on('click', '.edit-recipe', function handleEditRecipeClick (e) {
    const recipeId = $(this).closest('.recipe').data('recipe-id')
    $('#editModal').data('recipe-id', recipeId)
    $('#editModal').modal()
  })

  // edit recipe click to save changes
  $('#saveEdit').on('click', handleEditRecipeClick)

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
}) // end of document.ready//

// when a delete button for a specific recipe is clicked
function handleDeleteRecipeClick (e) {
  const recipeId = $(this).parents('.recipe').data('recipe-id')
  $.ajax({
    url: '/api/recipes/' + recipeId,
    method: 'DELETE',
    success: function handleDeleteRecipeSuccess (data) {
      let deletedRecipeId = data._id
      $('div[data-recipe-id=' + deletedRecipeId + ']').remove()
    }
  })
}

function handleEditRecipeClick (e) {
  let newName = $('#editName').val()
  console.log(newName)
  const recipeId = $('#editModal').data('recipe-id')
  console.log(recipeId)
  $.ajax({
    url: '/api/recipes/' + recipeId,
    method: 'PUT',
    data: {name: newName},
    success: function (recipe) {
      $(`.recipe[data-recipe-id='${recipeId}']`).remove()
      renderRecipes(recipe)
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
    success: renderModalSearchRecipe,
    error: function getApiRecipesError () {
      console.log('Get Recipes Error')
    }
  })
}

// store found recipe in global variable
let globalRecipe = []

// takes api data and puts on modal
function renderModalSearchRecipe (recipes) {
  let edamamApiRecipe = {
    name: recipes.hits[0].recipe.label,
    calories: recipes.hits[0].recipe.calories,
    healthLabels: recipes.hits[0].recipe.healthLabels,
    source: recipes.hits[0].recipe.source,
    sourceUrl: recipes.hits[0].recipe.url,
    imgUrl: recipes.hits[0].recipe.image,
    ingredients: recipes.hits[0].recipe.ingredientLines,
    yield: recipes.hits[0].recipe.yield
  }
  globalRecipe.push(edamamApiRecipe)
  let ingredientsFormattedList = renderIngredient(edamamApiRecipe.ingredients)
  let recipeHtml = (`
    <div class='modal modal-transparent fade' tabindex='-1' role='dialog' id='recipeModal'>
      <div class='modal-dialog'>
        <div class='recipe' data-recipe-id=''>
          <div class='col-md-12'>
            <div class='thumbnail'>
              <img src='${edamamApiRecipe.imgUrl}' alt='recipe image'>
              <div class='caption'>
              <h4 class='inline-header'><strong>${edamamApiRecipe.name}</strong></h4>
              <p>via<a href='${edamamApiRecipe.sourceUrl}'> ${edamamApiRecipe.source}</a></p>
              <h4 class='inline-header'><strong>Ingredients:</strong></h4>
              <ul>${ingredientsFormattedList}</ul>
              <h4 class='inline-header'><strong>Yield:</strong></h4>
              <ul>${edamamApiRecipe.yield}</ul>
              <div class='bottom-align-buttons'>
                <button type='button' class='btn btn-primary add-recipe'><span class='icon'><i class='fa fa-plus'></i></span> Add Recipe</button>
                <button type='button' class='btn btn-danger close-recipe'><span class='icon'><i class='fa fa-trash-o'></i></span> Not This Recipe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `)
  $('#modals').prepend(recipeHtml)
  $('#recipeModal').modal()
}

// operation for the close button on modal
function closeRecipe () {
  $('#recipeModal').modal('hide')
}

// posting recipe from API onto database
function postRecipes (recipes) {
  let edamamApiRecipe = {
    name: globalRecipe[0].name,
    calories: globalRecipe[0].calories,
    healthLabels: globalRecipe[0].healthLabels,
    source: globalRecipe[0].source,
    sourceUrl: globalRecipe[0].sourceUrl,
    imgUrl: globalRecipe[0].imgUrl,
    ingredients: globalRecipe[0].ingredients,
    yield: globalRecipe[0].yield
  }
  $.ajax({
    method: 'POST',
    url: '/api/recipes',
    data: edamamApiRecipe,
    success: renderRecipes,
    error: function () {
      console.log('Recipe posting failed')
    }
  })
  $('#recipeModal').modal('hide')
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

function renderRecipes (recipe) {
  let ingredientsFormattedList = renderIngredient(recipe.ingredients)
  let recipeHtml = (`
    <div class='recipe' data-recipe-id='${recipe._id}'>
      <div class='col-xs-3 col-md-4'>
        <div class='thumbnail'>
          <img src='${recipe.imgUrl}' alt='recipe image'>
          <div class='caption'>
            <h4 class='inline-header'><strong>${recipe.name}</strong></h4>
            <p>via<a href='${recipe.sourceUrl}'> ${recipe.source}</a></p>
            <h4 class='inline-header'><strong>Ingredients:</strong></h4>
            <ul>${ingredientsFormattedList}</ul>
            <h4 class='inline-header'><strong>Reviews:</strong></h4>
            <ul>${recipe.reviews}</ul>
            <div class='bottom-align-buttons'>
              <button type='button' class='btn btn-primary add-review'><span class='icon'><i class='fa fa-plus'></i></span> Add Review</button>
              <button type='button' class='btn btn-info edit-recipe'><span class='icon'><i class='fa fa-pencil'></i></span> Edit</button>
              <button type='button' class='btn btn-danger delete-recipe'><span class='icon'><i class='fa fa-trash-o'></i></span> Delete Recipe</button>
            </div>

          </div>
        </div>
      </div>
    </div>
        <!-- end of one recipe -->
      `)
  $('#recipes').prepend(recipeHtml)
}

function handleNewReviewSubmit (e) {
  const recipeId = $('#reviewModal').data('recipe-id')
  let reviewerName = $('#reviewerName').val()
  let reviewRating = $('#recommendationRating').val()
  $.ajax({
    method: 'POST',
    url: '/api/recipes/' + recipeId + '/reviews',
    data: {
      author: reviewerName,
      wouldRecommend: reviewRating
    },
    success: function (review) {
      console.log('Review added!')
      $.ajax({
        method: 'GET',
        url: '/api/recipes/' + recipeId,
        success: function (recipe) {
          $(`.recipe[data-recipe-id='${recipeId}']`).remove()
          renderRecipes(recipe)
        }
      })
    },
    error: function failedNewReview (e) {
      console.log('saved new review not working')
    }
  })
}
