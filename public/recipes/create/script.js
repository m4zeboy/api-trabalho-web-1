const addIngredientButton = document.querySelector(
  'button#add-ingredient-button',
)
const ingredientsContainer = document.querySelector('.ingredients-container')
const ingredientWrapper = ingredientsContainer.querySelector(
  '.ingredient-wrapper',
)

addIngredientButton.addEventListener('click', (event) => {
  const ingredientWrapperClone = ingredientWrapper.cloneNode(true)
  console.log(ingredientWrapperClone)
  ingredientsContainer.appendChild(ingredientWrapperClone)
})
