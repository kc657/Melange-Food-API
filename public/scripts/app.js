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
    success: onSuccess,
    error: onError
  })
}

// sample search https://api.edamam.com/search?q=chicken&app_id=e7f27eb3&app_key=1a416555863a852b35cd1701d9a4c0c1

function onSuccess () {
  console.log('hi')
}
function onError () {
  console.log('bye')
}
