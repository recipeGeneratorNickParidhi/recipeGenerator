// Creating Namespace
recipesApp = {};

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
            recipesApp.errorHandle();
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
            recipesApp.displayIngredients(jsonData);
            recipesApp.displaydata(jsonData);
            recipesApp.cardClick.style.display = 'block';
        })
        .catch(function (error) {
            recipesApp.errorHandle();
        })
}

// Defining a method to get the randomly selected recipe and return the ingredients list
recipesApp.displayIngredients = function(recipesData) {
    const ulItem = document.querySelector("#ingredientsList");
    ulItem.innerHTML = '';
    const ingredientsArray = recipesData.extendedIngredients;
    ingredientsArray.forEach( ingredientObj => {
        const listItem = document.createElement("li");
        listItem.textContent = ingredientObj.original;
        ulItem.appendChild(listItem);

    });
}

// Displaying data on page from recipesApp.apiCallRecipe on page
recipesApp.displaydata = function (recipesData) {
    const outerDiv = document.querySelector('#recipeResult');
    const recipeInstructionsDiv = document.querySelector("#recipeInstructions");
    const newHeading = document.createElement('h2');
    const imageItem = document.createElement('img');
    const articleItem = document.createElement("article");
    // Clearing Div so new recipe can be displayed
    outerDiv.innerHTML = '';
    // assigning the information from the object to HTML
    newHeading.textContent = recipesData.title;
    imageItem.src = recipesData.image;
    articleItem.textContent = recipesData.instructions;
      // Appending and formatting everything
    outerDiv.innerHTML = `
    <div class="imgContainer"><img src=${imageItem.src} alt="Image of ${newHeading.textContent}"></div>
    <h2>${newHeading.textContent}</h2>
    <div class="cookingTimeServings">
        <div class="cookTime"><i class="fa-regular fa-clock"></i>Cook Time<p>${recipesData.readyInMinutes} mins</p></div>
        <div class="servings"><i class="fa-regular fa-user"></i>Serves<p>${recipesData.servings}</p></div>
    </div>
    <button class="ingredientsButton" id="ingredientsButton">Ingredients</button>
    `;

    recipeInstructionsDiv.innerHTML = 
    `<article class="recipeInfo">${articleItem.textContent}</article>
    <p class="recipeLink">  For the original recipe, click the link 
    <a href="${recipesData.sourceUrl}">here</a> `;

}

// Error Handling no response from API
recipesApp.errorHandle = function () {
    const outerDiv = document.querySelector('#recipeResult');
    outerDiv.innerHTML = '';
    const ulItem = document.querySelector("#ingredientsList");
    ulItem.innerHTML = '';
    const newHeading = document.createElement('h2');
    newHeading.textContent = 'Sorry - No Recipes match that selection. Please select again';
    outerDiv.appendChild(newHeading);
    // add a function here for a random joke when error handling!
    recipesApp.randomJoke();

}

recipesApp.randomJoke = function () {
    const apiUrl = `https://api.spoonacular.com/food/jokes/random`
    const url = new URL(apiUrl);
    url.search = new URLSearchParams ({
        apiKey: recipesApp.apiKey,
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
        console.log(jsonData);
        })
        .catch(function (error) {
            console.log(error);
        })
}



recipesApp.cardListener = function() {
    recipesApp.cardClick.addEventListener('click', function (event) {
        const innerCard = document.querySelector('#cardHolderInner').classList.toggle('rotateCard');
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