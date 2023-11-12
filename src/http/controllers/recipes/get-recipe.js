import { ResourceNotFound } from '../../../use-cases/errors/resource-not-found.js'
import { GetRecipeUseCase } from '../../../use-cases/get-recipe.js'
import { makeGetRecipeParamsSchema } from '../schemas/get-recipe-params-schema.js'

export async function getRecipe(request, reply) {
  const getRecipeParamsSchema = makeGetRecipeParamsSchema()
  const { recipeId } = getRecipeParamsSchema.parse(request.params)
  try {
    const useCase = new GetRecipeUseCase()
    const { recipe } = await useCase.execute({ id: recipeId })

    return reply.send({ recipe })
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
