import { prisma } from '../../../lib/database.js'
import { GetRecipeUseCase } from '../../../use-cases/get-recipe.js'
import { html } from './templates/html.js'

export async function renderRecipeDetailsPage(req, reply) {
  const { id } = req.params
  const useCase = new GetRecipeUseCase()
  const { recipe } = await useCase.execute({ id })
  const comments = await prisma.commentsOfRecipe.findMany({
    where: {
      recipe_id: id,
    },
    select: {
      recipe_id: true,
      user: {
        select: {
          full_name: true,
        },
      },
      created: true,
      comment: true,
    },
  })
  const template = html(recipe, comments)
  return reply.type('text/html').send(template)
}
