export function displaydata (recipesData) {
    const outerDiv = document.querySelector('#recipeResult');
    const recipeInstructionsDiv = document.querySelector("#recipeInstructions");
    const newHeading = document.createElement('h2');
    const imageItem = document.createElement('img');
    const articleItem = document.createElement("article");
    // Clearing Div so new recipe can be displayed
    outerDiv.innerHTML = '';
    recipeInstructionsDiv.innerHTML = "";
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

// Defining a method to get the randomly selected recipe and return the ingredients list
export function displayIngredients (recipesData) {
  const ulItem = document.querySelector("#ingredientsList");
  ulItem.innerHTML = '';
  const ingredientsArray = recipesData.extendedIngredients;
  ingredientsArray.forEach( ingredientObj => {
      const listItem = document.createElement("li");
      listItem.textContent = ingredientObj.original;
      ulItem.appendChild(listItem);

  });
}

// Creating and Eventlistener to flip the card
export function cardListener () {
  document.querySelector('#cardHolder').addEventListener('click', function (event) {
    document.querySelector('#cardHolderInner').classList.toggle('rotateCard');
  })
}