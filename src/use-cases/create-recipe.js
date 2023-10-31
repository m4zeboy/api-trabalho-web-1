import { prisma } from '../lib/database.js'
import { verifyCategoriesExists } from './rules/verify-categories-exists.js'
import { verifyUserExists } from './rules/verify-user-exists.js'

export class CreateRecipeUseCase {
  async execute(body) {
    try {
      // verify if author exists
      await verifyUserExists(body.authorId)

      // verify categories
      await verifyCategoriesExists(body.categories)

      // create recipe
      const recipe = await prisma.recipe.create({
        data: {
          author_id: body.authorId,
          recipe_name: body.recipeName,
          description: body.description,
          portions: body.portions,
          cooking_method: body.cookingMethod,
          nutritional_value: body.nutritionalValue,
          preparation_instructions: body.preparationInstructions,
          preparation_time: body.preparationTime,
        },
      })

      // assign categories
      for await (const categoryName of body.categories) {
        await prisma.categoriesOfRecipe.create({
          data: {
            recipe_id: recipe.id,
            category_name: categoryName,
          },
        })
      }

      // assign ingredients
      for await (const {
        ingredientName,
        quantity,
        unity,
      } of body.ingredients) {
        await prisma.ingredientsOfRecipe.create({
          data: {
            ingredient_name: ingredientName,
            quantity,
            unity,
            recipe_id: recipe.id,
          },
        })
      }
      return { recipe }
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}
