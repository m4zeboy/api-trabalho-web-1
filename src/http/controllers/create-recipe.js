import { CreateRecipeUseCase } from '../../use-cases/create-recipe.js'
import { ResourceNotFound } from '../../use-cases/errors/resource-not-found.js'
import { makeCreateRecipeBodySchema } from './schemas/create-recipe-body-schema.js'

export async function createRecipe(req, reply) {
  const createRecipeBodySchema = makeCreateRecipeBodySchema()
  const body = createRecipeBodySchema.parse(req.body)
  try {
    const useCase = new CreateRecipeUseCase()
    await useCase.execute(body)
    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message })
    }
    console.log(error)
    throw error
  }
}
