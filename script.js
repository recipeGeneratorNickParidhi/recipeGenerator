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
recipesApp.populateCuisineSelect = function (cuisinesArray){
    // using a forEach loop to populate the select
    cuisinesArray.forEach((option) => {
        const newOption = document.createElement('option');
        newOption.value = option;
        newOption.textContent = option;
        recipesApp.select.appendChild(newOption);
    })
}

// Adding event listener to the select to listen for users selection and saving that to a variable
recipesApp.userQuery = function(dropdownMenu){
    dropdownMenu.addEventListener('change', function (event) {
        event.preventDefault()
        const selectedCusine = this.value
        recipesApp.apiCallCuisine(selectedCusine)
    })
}


recipesApp.apiKey = "4d0e3cee240e458897c51af84a206073"

// Making api call based on user's cuisine selection to return a dataset of 10 recipes
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

// method to make a seperate API call based selecting a random recipe and using the ID to get ingredients and information
recipesApp.apiCallRecipe = function (cuisineArray) {
// need to also add ingredients info
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
            recipesApp.displaydata(jsonData);
        })
        .catch(function (error) {
            recipesApp.errorHandle();
        })
}

// Displaying data on page from recipesApp.apiCallRecipe on page
recipesApp.displaydata = function (recipesData) {
    // console.log(recipesData);
    const outerDiv = document.querySelector('#recipeResult');
    const newHeading = document.createElement('h2');
    const imageItem = document.createElement('img');
    const articleItem = document.createElement("article");
    const listItem = document.createElement("li");

    // Clearing Div so new recipe can be displayed
    outerDiv.innerHTML = '';
    // assigning the information from the object to HTML
    newHeading.textContent = recipesData.title;
    imageItem.src = recipesData.image;
    articleItem.textContent = recipesData.instructions
    // Appending and formatting everything
    outerDiv.innerHTML = `
    <h2>${newHeading.textContent}</h2>
    <div class="imgContainer"><img src=${imageItem.src}></div>
    <article class="recipeInfo">${articleItem.textContent}</article>
    `;

    // <article class="recipeSummary">${articleItem.textContent}</article>
    
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