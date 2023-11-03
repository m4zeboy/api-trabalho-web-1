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

window.onload = async function () {
  const response = await fetch('/me')
  const profile = await response.json()

  console.log(profile)
  const inputAuthorName = document.querySelector('input#authorName')
  const inputAuthorId = document.querySelector('input#authorId')

  inputAuthorName.value = profile.full_name
  inputAuthorId.value = profile.id
}
const createRecipeForm = document.querySelector('form#create-recipe')

createRecipeForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const body = getFormData()
})

function getFormData() {
  const fieldsets = Array.from(createRecipeForm.querySelectorAll('fieldset'))

  const transformedFieldsets = fieldsets.map((fieldset) => {
    if (fieldset.id === 'recipe-ingredients') {
      return {
        id: fieldset.id,
        ingredients: Array.from(
          fieldset.querySelectorAll('.ingredient-wrapper'),
        ),
      }
    }
    return {
      id: fieldset.id,
      fields: Array.from(fieldset.querySelectorAll('input, select, textarea')),
    }
  })

  const body = {}

  transformedFieldsets.forEach((fieldset) => {
    if (fieldset.id === 'recipe-ingredients') {
      body.ingredients = fieldset.ingredients.map((ingredientWrapper) => {
        console.log(ingredientWrapper)

        const ingredient = {}
        ingredient.ingredientName = ingredientWrapper.querySelector(
          'input#ingredientName',
        ).value
        ingredient.quantity =
          ingredientWrapper.querySelector('input#quantity').value
        ingredient.unity = ingredientWrapper.querySelector('input#unity').value
        return ingredient
      })
    } else {
      fieldset.fields.forEach((field) => {
        body[field.id] = field.value
      })
    }

    delete body.authorName
  })

  return body
}
