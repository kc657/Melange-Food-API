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
})

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
  let edamamName = recipes.hits[0].recipe.label
  let edamamCalories = recipes.hits[0].recipe.calories
  let edamamHealthLabels = recipes.hits[0].recipe.healthLabels
  let edamamSource = recipes.hits[0].recipe.source
  let edamamUrl = recipes.hits[0].recipe.url
  let edamamImage = recipes.hits[0].recipe.image
  let edamamIngredients = recipes.hits[0].recipe.ingredientLines
  let ingredientList = renderIngredient(edamamIngredients)

  $.ajax({
    method: 'POST',
    url: '/api/recipes',
    dataType: edamamName,
    success: renderEdamamRecipes,
    error: function () {
      console.log('Recipe posting failed')
    }
  })
}

function renderEdamamRecipes (recipes) {
  let recipeHtml = (`
      <div class='row recipe'>
        <div class='col-md-10 col-md-offset-1'>
          <div class='panel panel-default'>
            <div class='panel-body'>

             <!-- begin recipe internal row -->
              <div class='row'>
                <div class='col-md-3 col-xs-12 thumbnail recipe-image'>
                  <img src='${edamamImage}' alt='recipe image'>
                </div>

                <div class='col-md-9 col-xs-12'>
                  <ul class='list-group'>
                    <li class='list-group-item'>
                      <h4 class='inline-header'>Recipe Name:</h4>
                      <span class='recipe-name'>${edamamName}</span>
                    </li>

                    <li class='list-group-item'>
                      <a href='${edamamUrl}'> via ${edamamSource}</a>
                    </li>

                    <li class='list-group-item'>
                      <h4 class='inline-header'>Ingredients:</h4>
                      <ul>${ingredientList}</ul>
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

// takes seed recipes and renders it on the page
function renderSeedRecipes (recipe) {
  let ingredientList = renderIngredient(recipe.ingredients)
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
                    <ul>${ingredientList}</ul>
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

function renderIngredient (ingredients) {
  let ingredientHtml = ''
  ingredients.forEach(function (e) {
    ingredientHtml += (`
        <li class='ingredient' id='ingredient'>${e}</li>
      `)
  })
  return ingredientHtml
}
