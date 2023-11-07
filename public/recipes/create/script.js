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

const createRecipeForm = document.querySelector('form#create-recipe')

window.onload = async function () {
  const response = await fetch('/me')
  const profile = await response.json()

  const inputAuthorName = document.querySelector('input#authorName')
  const inputAuthorId = document.querySelector('input#authorId')

  inputAuthorName.value = profile.full_name
  inputAuthorId.value = profile.id

  // load categories options
  const categoriesSelect = createRecipeForm.querySelector('select#categories')
  const categoriesResponse = await fetch('/categories')
  const categories = await categoriesResponse.json()
  // console.log(categories)
  for (const category of categories) {
    const categoryOption = document.createElement('option')
    categoryOption.innerText = category.name
    categoryOption.value = category.name
    categoriesSelect.appendChild(categoryOption)
  }
}

createRecipeForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const body = getFormData()
  try {
    const response = await fetch('/recipes', {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message)
    }
    const data = await response.json()

    const fileInput = document.querySelector("input[type='file']#file")
    const formData = new FormData()
    for (const file of fileInput.files) {
      formData.append('files', file)
    }

    try {
      const response = await fetch(`/recipes/${data.id}/images`, {
        body: formData,
        method: 'POST',
      })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
      }

      createRecipeForm.reset()
    } catch (e) {
      console.log(e)
    }

    console.log(data)
  } catch (err) {
    const invalidFeedback = document.querySelector('.alert.alert-danger')
    invalidFeedback.innerHTML = err.message
    invalidFeedback.classList.remove('d-none')
  }
})

function getFormData() {
  const fieldsets = Array.from(createRecipeForm.querySelectorAll('fieldset'))

  fieldsets.pop()

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
      body.ingredients = getIngredients(fieldset)
    } else if (fieldset.id === 'recipe-categories') {
      const selectedOptions = getSelectedOptions(fieldset)
      body.categories = selectedOptions
    } else {
      fieldset.fields.forEach((field) => {
        body[field.id] = field.value
      })
    }
    delete body.authorName
  })

  return body
}

function getIngredients(fieldset) {
  return fieldset.ingredients.map((ingredientWrapper) => {
    const ingredient = {}
    ingredient.ingredientName = ingredientWrapper.querySelector(
      'input#ingredientName',
    ).value
    ingredient.quantity =
      ingredientWrapper.querySelector('input#quantity').value
    ingredient.unity = ingredientWrapper.querySelector('input#unity').value
    return ingredient
  })
}

function getSelectedOptions(fieldset) {
  const selectedOptions = []
  const options = Array.from(fieldset.fields[0].options)
  for (const option of options) {
    if (option.selected) {
      selectedOptions.push(option.value)
    }
  }
  return selectedOptions
}
