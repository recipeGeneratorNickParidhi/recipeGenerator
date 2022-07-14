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
        recipesApp.apiCall(selectedCusine)
    })
}


recipesApp.apiUrl = "https://api.spoonacular.com/recipes/complexSearch/"
recipesApp.apiKey = "04fc501ca28f472fbe5d7a82c0688755"

// Making api call based on user selection
recipesApp.apiCall = function (selectedCusine) {
    const url = new URL(recipesApp.apiUrl);
    url.search = new URLSearchParams ({
        apiKey: recipesApp.apiKey,
        cuisine: selectedCusine
    })

    fetch(url)
        .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error();
        }
        })
        .then(function (jsonData) {
            recipesApp.displaydata(jsonData)
        })
        .catch(function (error) {
            recipesApp.errorHandle()
        })
}

// Displaying data on page
recipesApp.displaydata = function (recipesData) {

    const outerDiv = document.querySelector('#recipeResult');
    const newHeading = document.createElement('h2');
    const imageItem = document.createElement('img');

    // Clearing Div so new recipe can be displayed
    outerDiv.innerHTML = '';

    // Choosing random number between 0 and 9 to select from Array
    recipesApp.randomNumber = Math.floor(Math.random() * 10);

    newHeading.textContent = recipesData.results[recipesApp.randomNumber].title;
    imageItem.src = recipesData.results[recipesApp.randomNumber].image;

    outerDiv.innerHTML = `
    <h2>${newHeading.textContent}</h2>
    <div class="imgContainer"><img src=${imageItem.src}></div>
    `
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