import errorHandle from "./errorHandleModule.js";
import { displaydata, displayIngredients } from "./displayDataModule.js";
import randomizer from "./randomizerModule.js"

// API Key
const apiKey = "f96847a1b0264361a0b853ba747d1ede"

// Making api call to autocomplete endpoint based on user's search

export function apiCallSearch (searchedRecipe) {
    const apiUrl = "https://api.spoonacular.com/recipes/autocomplete";
    const url = new URL(apiUrl);
    url.search = new URLSearchParams({
        apiKey: apiKey,
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
            apiCallRecipe(jsonData[0].id);
        })
        .catch(function (error) {
            errorHandle();
        })
}

// Making api call based on user's cuisine selection to return an object of 10 recipes
export function apiCallCuisine  (selectedCuisine) {
    const apiUrl = "https://api.spoonacular.com/recipes/complexSearch/";
    const url = new URL(apiUrl);
    url.search = new URLSearchParams({
        apiKey: apiKey,
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
            randomizer(jsonData);
        })
        .catch(function (error) {
            errorHandle();
        })
}

// Making api call based on user's diet selection to return an object of 10 recipes
export function apiCallDiet (selectedDiet) {
    const apiUrl = "https://api.spoonacular.com/recipes/complexSearch/";
    const url = new URL(apiUrl);
    url.search = new URLSearchParams({
        apiKey: apiKey,
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
            randomizer(jsonData);
        })
        .catch(function (error) {
            errorHandle();
        })
}

// method to make a seperate API call based after running a randomizer and using the ID to get ingredients and instructions
export function apiCallRecipe (recipeIdNumber) {

    const apiUrl = `https://api.spoonacular.com/recipes/${recipeIdNumber}/information`
    const url = new URL(apiUrl);
    url.search = new URLSearchParams({
        apiKey: apiKey,
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
            // Clearing HTML from previous response and rotating card back to front
            document.querySelector("#ingredientsList").innerHTML = '';
            document.querySelector('#recipeResult').innerHTML = '';
            document.querySelector("#recipeInstructions").innerHTML = '';
            document.querySelector('#cardHolderInner').classList.remove('rotateCard');
            // Calling Functions to display cards
            displayIngredients(jsonData);
            displaydata(jsonData);
            document.querySelector('#cardHolder').style.display = 'block';
        })
        .catch(function () {
            errorHandle();
        })
}