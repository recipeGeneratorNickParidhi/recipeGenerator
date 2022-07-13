// Creating Namespace
recipesApp = {};

// Building Array for Cuising Selection
recipesApp.cuisineOptions = ['italian', 'british', 'chinese']

// Querying Select from HTML and saving as variable
recipesApp.select = document.querySelector('select')

// using a forEach loop to populate the select
recipesApp.cuisineOptions.forEach((data) => {
    const newOption = document.createElement('option')

    newOption.value = data
    newOption.textContent = data

    recipesApp.select.appendChild(newOption)

})

// Adding event listener to the select to listen for users selection and saving that to a variable
recipesApp.select.addEventListener('change', function () {
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