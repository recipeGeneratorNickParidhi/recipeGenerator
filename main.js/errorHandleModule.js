export default function errorHandle () {
    document.querySelector("#recipeInstructions").innerHTML = "";
    const outerDiv = document.querySelector('#recipeResult');
    outerDiv.innerHTML = '';
    const ulItem = document.querySelector("#ingredientsList");
    ulItem.innerHTML = '';
    const newHeading = document.createElement('h2');
    newHeading.textContent = 'Sorry - No Recipes match that selection. Please select again';
    outerDiv.appendChild(newHeading);
}