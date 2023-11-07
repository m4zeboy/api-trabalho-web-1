import { prisma } from '../lib/database.js'
import { ResourceNotFound } from './errors/resource-not-found.js'

export class GetRecipeUseCase {
  async execute({ id }) {
    try {
      const recipe = await prisma.recipe.findUnique({
        where: { id },
        select: {
          recipe_name: true,
          cooking_method: true,
          created: true,
          description: true,
          nutritional_value: true,
          portions: true,
          id: true,
          preparation_instructions: true,
          preparation_time: true,
          author: {
            select: {
              full_name: true,
              id: true,
            },
          },
          CategoriesOfRecipe: {
            select: {
              category_name: true,
            },
          },
          IngredientsOfRecipe: {
            select: {
              id: true,
              ingredient_name: true,
              quantity: true,
              unity: true,
            },
          },
          ImagesOfRecipe: {
            select: {
              url: true,
            },
          },
        },
      })
      if (!recipe) {
        throw new ResourceNotFound()
      }

      return { recipe }
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}
