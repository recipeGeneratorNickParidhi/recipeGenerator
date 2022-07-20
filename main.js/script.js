import burgerMenu from "./burgerMenuModule.js";
import { apiCallCuisine } from "./apiCallsModule.js";
import { cardListener } from "./displayDataModule.js";
import  populateSelect from "./selectPopulateModule.js";


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

// Adding event listener to the SELECT to listen for users selection and calling an API call method
recipesApp.userQuery = function(){
    document.querySelector('select').addEventListener('change', function (event) {
        event.preventDefault();
        const selectedCuisine = this.value;
        apiCallCuisine(selectedCuisine);
    })
}
// Init
recipesApp.init = function(){
    burgerMenu();
    populateSelect(recipesApp.cuisineOptions);
    recipesApp.userQuery();
    cardListener();

}
// Call the init method to kickstart the app upon page load
recipesApp.init();