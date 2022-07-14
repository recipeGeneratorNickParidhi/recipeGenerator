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

// galleryApp.apiUrl = "https://api.unsplash.com/photos";
// galleryApp.apiKey = "Qi9SDpY5MEDJMQvbKtLUlhrGYl4F5a_zSjRWn4e01z8";

// create a method (AKA function on the app object) which requests information from the API
// logs it to the console
// galleryApp.getPhotos = function (){
//   const url = new URL(galleryApp.apiUrl);
//   url.search = new URLSearchParams({
//     client_id: galleryApp.apiKey
//   })
//   fetch(url)
//     .then((response) => {
//       return response.json();
//     })
//     .then((jsonResponse) => {
//       console.log(jsonResponse);
//       galleryApp.displayPhotos(jsonResponse);
//     })
// }
// Adding event listener to the select to listen for users selection and saving that to a variable
recipesApp.select.addEventListener('change', function (event) {
    event.preventDefault()
    const selectedCusine = this.value
    recipesApp.apiCall(selectedCusine)
})



// Making api call based on user selection
recipesApp.apiCall = function (selectedCusine) {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=74f35dea60504b57ae6e6936c084093f&cuisine=${selectedCusine}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            recipesApp.displaydata(jsonData)
        });

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
    console.log(newHeading);
    console.log(imageItem);
    outerDiv.innerHTML = `
    <h2>${newHeading.textContent}</h2>
    <div class="imgContainer"><img src=${imageItem.src}></div>
    `
    // outerDiv.appendChild(newHeading);
    // outerDiv.appendChild(imageItem);

}

recipesApp.init = function(){
    recipesApp.populateCuisineSelect(recipesApp.cuisineOptions);
}


// Call the init method to kickstart the app upon page load
recipesApp.init();