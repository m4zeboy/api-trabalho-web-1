import { z } from 'zod'
import { ResourceNotFound } from '../../../use-cases/errors/resource-not-found.js'
import { prisma } from '../../../lib/database.js'

export async function addComment(req, reply) {
  const addCommentBodySchema = z.object({
    comment: z.string(),
  })
  const addCommentParamsSchema = z.object({
    recipeId: z.string().uuid(),
  })
  const { comment } = addCommentBodySchema.parse(req.body)

  const { recipeId: recipe_id } = addCommentParamsSchema.parse(req.params)

  const user_id = req.sub
  try {
    const commentOfRecipe = await prisma.commentsOfRecipe.create({
      data: {
        comment,
        created: new Date(),
        user_id,
        recipe_id,
      },
    })

    return reply.status(201).send(commentOfRecipe)
  } catch (error) {
    console.log(error)
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
