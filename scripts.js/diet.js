import burgerMenu from "./burgerMenuModule.js";
import { apiCallDiet } from "./apiCallsModule.js";
import { cardListener } from "./displayDataModule.js";
import populateSelect from "./selectPopulateModule.js";

// Creating Namespace
const recipesApp = {};

// Building Array for Cuising Selection
recipesApp.dietOptions = [
    "Gluten Free",
    "Ketogenic",
    "Lacto-Vegetarian",
    "Low FODMAP",
    "Ovo-Vegetarian",
    "Paleo",
    "Pescetarian",
    "Primal",
    "Vegan",
    "Vegetarian",
    "Whole30"
];


// Adding event listener to the SELECT to listen for users selection and calling an API call method
recipesApp.userQuery = function(){
    document.querySelector('select').addEventListener('change', function (event) {
        event.preventDefault();
        const selectedDiet = this.value;
        apiCallDiet(selectedDiet);
    })
}

// Init
recipesApp.init = function(){
    burgerMenu();
    populateSelect(recipesApp.dietOptions);
    recipesApp.userQuery();
    cardListener();
}
// Call the init method to kickstart the app upon page load
recipesApp.init();