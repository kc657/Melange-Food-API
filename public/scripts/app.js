console.log('Sanity Check')

$(document).ready(function () {
  $('#submit-ingredients').on('submit', function (doc) {
    doc.preventDefault()
    console.log('testing')
    getRecipes()
  })
})

function getRecipes () {
  $.ajax({
    method: 'GET',
    url: 'https://api.edamam.com/search',
    data: $('form').serialize(),
    dataType: 'json',
    success: renderMultipleRecipes,
    error: onError
  })
}

// sample search https://api.edamam.com/search?q=chicken&app_id=e7f27eb3&app_key=1a416555863a852b35cd1701d9a4c0c1

function renderMultipleRecipes (recipes) {
  recipes.forEach(function(recipe){
    renderRecipe(recipe)
  })
}

function onError () {
  console.log('bye')
}

//takes an album and renders it on the page
function renderRecipe(recipe) {
  console.log('recipe rendering', recipe)
  let recipeHtml = (`
    <div class='row recipe'>
      <div class='col-md-10 col-md-offset-1'>
        <div class='panel panel-default'>
          <div class='panel-body'>

          // begin recipe internal row
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

                </ul>
              </div>
              // end of recipe internal row

              <div class='panel-footer'>
              </div>

            </div>
          </div>
        </div>
      </div>
      // end of one recipe
    `)
    $('#recipes').prepend(recipeHtml)
}
