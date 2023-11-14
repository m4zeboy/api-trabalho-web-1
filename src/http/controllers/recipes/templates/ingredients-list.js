import { ingredientWrapper } from './ingredient-wrapper.js'

export const ingredientsList = (ingredients) => {
  return ingredients.map(({ ingredient_name, quantity, unity }) => {
    return ingredientWrapper({ ingredient_name, quantity, unity })
  })
}
