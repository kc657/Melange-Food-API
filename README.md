# M&#233;lange food-search-api

M&#233;lange API provides the hungry user with a tool to take ingredients they have in their pantry and search for new recipes! By integrating the Edamam Recipe Search API, the user is able to search for recipes using multiple ingredients in their inventory. The app returns a matching recipe the user can then save to the database and generate a list of saved recipes they want to cook.

## Technologies Used

<li> Express.js </li>
<li> NodeJS </li>
<li> Mongoose </li>
<li> MongoDB </li>
<li> JavaScript </li>
<li> jQuery </li>
<li> AJAX </li>
<li> Bootstrap </li>
<li> HTML5 </li>
<li> CSS3 </li>
<li> Edamam Recipe Search API </li>
<li> RESTful route design </li>
<li> CRUD </li>

## App Stories

<img src="http://i.imgur.com/errbdBV.jpg" width="600">

* The home page has a search for for users to add ingredients and return matching results

<img src="http://i.imgur.com/Loml1o6.jpg" width="600">

* User will be able to enter keywords into the search bar and press enter to submit the form. Once the form is submitted, the server will call to the Edamam Recipe Search API using the user input. The API returns the recipe data, which is then rendered to a modal for the user to review.

<img src="http://i.imgur.com/CTZIZAg.jpg" width="600">

* When the user clicks on the "Add Recipe" button, an AJAX call posts that recipe's id to the database and renders the recipe onto the bottom of the landing page.

* user will be able to click "add" button on query results and that recipe will be saved in our database

* user will be able to see existing saved recipes and edit title

* user will be able to delete local data

* user will click review button to open a modal with fields for author name and if they would recommend this recipe (yes or no). The results will append review information to that specific recipe.


## Planned Features

 - About page

 - Navigation bar

 - Edit Yield and return refactored recipe
