import { displaydata, displayIngredients } from "./displayDataModule.js";
import errorHandle from "./errorHandleModule.js";


// Creating Namespace
const recipesApp = {};

// Building Array for Cuising Selection
recipesApp.dietOptions = [
    "Gluten Free",
    "Ketogenic",
    "Lacto-Vegetarian",
    "Low FODMAP",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Vegetarian",
    "Whole30"
];
// Querying global variables from HTML and saving as variable
recipesApp.select = document.querySelector('select');
recipesApp.cardClick = document.querySelector('#cardHolder');

// Defining a method to populate the dropdown menu
recipesApp.populateCuisineSelect = function (dietArray){
    // using a forEach loop to populate the select
    dietArray.forEach((option) => {
        const newOption = document.createElement('option');
        newOption.value = option;
        newOption.textContent = option;
        recipesApp.select.appendChild(newOption);
    })
}

// Adding event listener to the SELECT to listen for users selection and calling an API call method
recipesApp.userQuery = function(dropdownMenu){
    dropdownMenu.addEventListener('change', function (event) {
        event.preventDefault();
        const selectedDiet = this.value;
        recipesApp.apiCallDiet(selectedDiet);
    })
}

recipesApp.apiKey = "feb72c00c13a445b8a1a2dbb2e3b7f59"

// Making api call based on user's diet selection to return an object of 10 recipes
recipesApp.apiCallDiet = function (selectedDiet) {
    const apiUrl = "https://api.spoonacular.com/recipes/complexSearch/";
    const url = new URL(apiUrl);
    url.search = new URLSearchParams ({
        apiKey: recipesApp.apiKey,
        diet: selectedDiet,
    });
    fetch(url)
        .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error();
        }
        })
        .then(function (jsonData) {
            recipesApp.randomizer(jsonData);
        })
        .catch(function (error) {
            errorHandle();
        })
}

// choosing a random recipe from the object
recipesApp.randomizer = function (cuisineArray){
    const randomNumber = Math.floor(Math.random() * 10);
    const recipeId = cuisineArray.results[randomNumber].id;
    recipesApp.apiCallRecipe(recipeId);
}

// method to make a seperate API call based after running a randomizer and using the ID to get ingredients and instructions
recipesApp.apiCallRecipe = function (recipeIdNumber) {
    
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeIdNumber}/information`
    const url = new URL(apiUrl);
    url.search = new URLSearchParams ({
        apiKey: recipesApp.apiKey,
        fillIngredients: true
    });
    fetch(url)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error();
        }
    })
    .then(function (jsonData) {
            displayIngredients(jsonData);
            displaydata(jsonData);
            recipesApp.cardClick.style.display = 'block';
        })
        .catch(function (error) {
            errorHandle();
        })
}

recipesApp.cardListener = function() {
    recipesApp.cardClick.addEventListener('click', function (event) {
        document.querySelector('#cardHolderInner').classList.toggle('rotateCard');
    })
}
// Init
recipesApp.init = function(){
    recipesApp.populateCuisineSelect(recipesApp.dietOptions);
    recipesApp.userQuery(recipesApp.select);
    recipesApp.cardListener();
}
// Call the init method to kickstart the app upon page load
recipesApp.init();