// Creating Namespace
recipesApp = {};

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
]
// Querying Select from HTML and saving as variable
recipesApp.select = document.querySelector('select')
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
        event.preventDefault()
        const selectedCusine = this.value
        recipesApp.apiCallCuisine(selectedCusine)
    })
}

recipesApp.apiKey = "84f93165fbed4c7eb646db9a3df0c69e"

// Making api call based on user's cuisine selection to return an object of 10 recipes
recipesApp.apiCallCuisine = function (selectedCusine) {
    const apiUrl = "https://api.spoonacular.com/recipes/complexSearch/"
    const url = new URL(apiUrl);
    url.search = new URLSearchParams ({
        apiKey: recipesApp.apiKey,
        cuisine: selectedCusine,
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
            recipesApp.apiCallRecipe(jsonData)
        })
            .catch(function (error) {
            recipesApp.errorHandle();
        })
}

// method to make a seperate API call based after running a randomizer and using the ID to get ingredients and instructions
recipesApp.apiCallRecipe = function (cuisineArray) {
    // choosing a random recipe from the object
    const randomNumber = Math.floor(Math.random() * 10);
    const recipeId = cuisineArray.results[randomNumber].id;
    
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information`
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
            console.log(jsonData);
            recipesApp.displayIngredients(jsonData);
            recipesApp.displaydata(jsonData);
        })
        .catch(function (error) {
            recipesApp.errorHandle();
        })
}

// Defining a method to get the randomly selected recipe and return the ingredients list
recipesApp.displayIngredients = function(recipesData) {
    const ulItem = document.querySelector("#ingredientsList");
    const ingredientsArray = recipesData.extendedIngredients;
    console.log(ingredientsArray);
    ingredientsArray.forEach( ingredientObj => {
        console.log(ingredientObj.original);
        const listItem = document.createElement("li");
        listItem.textContent = ingredientObj.original;
        ulItem.appendChild(listItem);
        console.log(listItem.textContent);

    });
}

// Displaying data on page from recipesApp.apiCallRecipe on page
recipesApp.displaydata = function (recipesData) {
    // console.log(recipesData);
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
    articleItem.textContent = recipesData.instructions
      // Appending and formatting everything
    outerDiv.innerHTML = `
    <h2>${newHeading.textContent}</h2>
    <div class="imgContainer"><img src=${imageItem.src}></div>`
    recipeInstructionsDiv.innerHTML = 
    `<article class="recipeInfo">${articleItem.textContent}</article>
    <p class="recipeLink">  For the original recipe, click the link 
    <a href="${recipesData.sourceUrl}">here</a> `;

}

// Error Handling no response from API
recipesApp.errorHandle = function () {
    const outerDiv = document.querySelector('#recipeResult');
    outerDiv.innerHTML = '';
    const newHeading = document.createElement('h2');
    newHeading.textContent = 'Sorry - No Recipes match that selection. Please select again';
    outerDiv.appendChild(newHeading);
    // add a function here for a random joke when error handling!

}

recipesApp.cardListener = function() {
    const cardClick = document.querySelector('#cardHolder')
    cardClick.addEventListener('click', function (event) {
        const innerCard = document.querySelector('#cardHolderInner').classList.toggle('rotateCard');
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