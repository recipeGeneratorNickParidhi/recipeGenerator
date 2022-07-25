// handles errors for API calls, in case we don't get back the data we need

export default function errorHandle () {
    document.querySelector('#cardHolder').style.display = 'block';
    document.querySelector('#cardHolderInner').classList.remove('rotateCard');
    document.querySelector("#recipeInstructions").innerHTML = "";
    const outerDiv = document.querySelector('#recipeResult');
    outerDiv.innerHTML = '';
    const ulItem = document.querySelector("#ingredientsList");
    ulItem.innerHTML = '';
    const newHeading = document.createElement('h2');
    const backHeading = document.createElement('h2')
    newHeading.textContent = 'Sorry - No Recipes match that selection. Please select again';
    backHeading.textContent = 'Sorry - No Recipes match that selection. Please select again';
    outerDiv.appendChild(newHeading);
    ulItem.appendChild(backHeading);
}