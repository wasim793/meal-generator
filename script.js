const getMealBtn = document.getElementById('get_meal');
const mealContainer = document.getElementById('meal');

getMealBtn.addEventListener("click" , () => {
    // console.log("1");
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    // .then(data => console.log(data))
    .then(res => {
        // console.log('res');
        createMeal(res.meals[0]);
    });
    // console.log(res.status);
     

});
function createMeal (meal)  {
    const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for(let i=1; i<=20; i++) {
		if(meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	}
    console.log(ingredients);
    // console.log("hello");
    mealContainer.innerHTML = `
    <div class="row">
    <div class="colums five">
    <img src = "${meal.strMealThumb}" alt ="meal Img" />
    <p><strong>Category:</strong>${meal.strCategory}</p>
    <p><strong>Area:</strong>${meal.strArea}</p>
    <p><strong>Tags:</strong>${meal.strTags}</p>
    <h5>Ingrediants</h5>
    <ul>

    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
    </ul>
    </div>
    <div class ="coloum seven">
    <h4>${meal.strMeal}</h4>
    <p>${meal.strInstructions}</p>
    </div>
    </div>
    ${meal.strYoutube ? `
		<div class="row">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>` : ''}
    `;
}
// console.log(res.status);