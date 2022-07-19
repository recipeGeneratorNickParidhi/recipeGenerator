import { displaydata, displayIngredients } from "./displayDataModule.js";
import errorHandle from "./errorHandleModule.js";


// Creating Namespace
const recipesApp = {};

// Building Array for Cuising Selection
recipesApp.cuisineOptions = [
    "African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
];
// Querying global variables from HTML and saving as variable
recipesApp.select = document.querySelector('select');
recipesApp.cardClick = document.querySelector('#cardHolder');
recipesApp.recipeSearch = document.querySelector('#recipeSearchForm');

// Defining a method to populate the dropdown menu
recipesApp.populateCuisineSelect = function (cuisinesArray){
    // using a forEach loop to populate the select
    cuisinesArray.forEach((option) => {
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
        const selectedCuisine = this.value;
        recipesApp.apiCallCuisine(selectedCuisine);
    })
}

// Adding event listener to the input to listen to users selection and calling API

recipesApp.userSearch = function(searchInput) {
    searchInput.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchItem = document.querySelector('#recipeSearch');
        recipesApp.apiCallSearch(searchItem.value);
        searchItem.value = '';
    })
}

recipesApp.apiKey = "feb72c00c13a445b8a1a2dbb2e3b7f59"

// Making api call to autocomplete endpoint based on user's search

recipesApp.apiCallSearch = function(searchedRecipe) {
    const apiUrl = "https://api.spoonacular.com/recipes/autocomplete";
    const url = new URL(apiUrl);
    url.search = new URLSearchParams({
        apiKey: recipesApp.apiKey,
        query: searchedRecipe,
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
            recipesApp.apiCallRecipe(jsonData[0].id);
        })
        .catch(function (error) {
            errorHandle();
        })    
}

// Making api call based on user's cuisine selection to return an object of 10 recipes
recipesApp.apiCallCuisine = function (selectedCuisine) {
    const apiUrl = "https://api.spoonacular.com/recipes/complexSearch/";
    const url = new URL(apiUrl);
    url.search = new URLSearchParams ({
        apiKey: recipesApp.apiKey,
        cuisine: selectedCuisine,
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
    recipesApp.apiCallRecipe(recipeId)
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
    recipesApp.populateCuisineSelect(recipesApp.cuisineOptions);
    recipesApp.userQuery(recipesApp.select);
    recipesApp.cardListener();
}
// Call the init method to kickstart the app upon page load
recipesApp.init();