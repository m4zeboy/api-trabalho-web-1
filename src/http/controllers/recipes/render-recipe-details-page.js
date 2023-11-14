import { GetRecipeUseCase } from '../../../use-cases/get-recipe.js'
import { html } from './templates/html.js'

export async function renderRecipeDetailsPage(req, reply) {
  const { id } = req.params
  const useCase = new GetRecipeUseCase()
  const { recipe } = await useCase.execute({ id })
  const template = html(recipe)
  return reply.type('text/html').send(template)
}
