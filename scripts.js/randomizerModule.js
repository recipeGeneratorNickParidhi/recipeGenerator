import { apiCallRecipe } from "./apiCallsModule.js";

// choosing a random recipe from the object
export default function randomizer (cuisineArray){
    const randomNumber = Math.floor(Math.random() * cuisineArray.results.length);
    const recipeId = cuisineArray.results[randomNumber].id;
    apiCallRecipe(recipeId)
}