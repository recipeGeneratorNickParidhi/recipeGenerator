import burgerMenu from "./burgerMenuModule.js";
import { apiCallSearch } from "./apiCallsModule.js";
import { cardListener } from "./displayDataModule.js";

// Creating Namespace
const recipesApp = {};

// Adding event listener to the input to listen to users selection and calling API
recipesApp.userSearch = function() {
    document.querySelector('#recipeSearchForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const searchItem = document.querySelector('#recipeSearch');
        apiCallSearch(searchItem.value);
        searchItem.value = '';
    })
}

// Init
recipesApp.init = function(){
    burgerMenu();
    recipesApp.userSearch();
    cardListener();
}
// Call the init method to kickstart the app upon page load
recipesApp.init();