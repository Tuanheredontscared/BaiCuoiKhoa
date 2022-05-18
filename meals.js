const searchBtn = document.getElementById("search-btn");
const mealsList = document.getElementById("meals");
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const search_btn = document.getElementById('search-input')
const searchInputTxt = document.getElementById("search-input")
// const input = document.getElementById('search-input')
mealsList.addEventListener('click', getMealRecipe);

function recipe_btn() {
  mealDetailsContent.parentElement.classList.remove('showRecipe');
}
searchBtn.addEventListener('click', findMeals)



async function fetchMealsApi() {
  // let searchInputTxt = document.getElementById("search-input").value
  const meals = await fetch(
    'https://www.themealdb.com/api/json/v1/1/filter.php?i='
  );
  const body = await meals.json();
  console.log(body);
  return body?.meals;

}

// find meals
async function findMeals() {
  const mealsArray = await fetchMealsApi()
  let searchInputTxt = document.getElementById("search-input").value;
  const result = mealsArray.filter(function (a) {
    return a.strMeal.trim().includes(searchInputTxt);
  })
  mealsPrint(result)
}



function mealsPrint(meals) {
  let mealsText = "";
  Array.from(meals).forEach(function (meals) {
    mealsText +=
      `<div class = "meal-item" data-id = "${meals.idMeal}">
    <div class = "meal-img">
        <img src = ${meals.strMealThumb} alt = "food">
    </div>
    <div class = "meal-name">
        <h3>${meals.strMeal}</h3>
        <a href = "#" class = "recipe-btn">Get Recipe</a>
    </div>
</div>`;
  });
  mealsList.innerHTML = mealsText;
}
fetchMealsApi().then(function (meals) {
  mealsPrint(meals)
});

// get recipe
async function getMealRecipe(event) {
  event.preventDefault();
  let mealItem = event.target.parentElement.parentElement
  // console.log(mealItem.dataset)
  const getRecipe = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
  const js = await getRecipe.json()
  createRecipe(js.meals[0])
  // console.log(js.meals)
  console.log(js)
}

function createRecipe(data) {
  let recipeText = `
      <h2 class = "recipe-title">${data.strMeal}</h2>
      <p class = "recipe-category">${data.strCategory}</p>
      <div class = "recipe-instruct">
          <h3>Instructions:</h3>
          <p>${data.strInstructions}</p>
      </div>
      <div class = "recipe-meal-img">
          <img src = "${data.strMealThumb}" alt = "">
      </div>
      <div class = "recipe-link">
          <a href = "${data.strYoutube}" target = "_blank">Watch Video</a>
      </div>
  `;
  mealDetailsContent.innerHTML = recipeText;
  mealDetailsContent.parentElement.classList.add('showRecipe');
}

