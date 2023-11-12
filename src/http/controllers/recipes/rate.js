import { z } from 'zod'
import { prisma } from '../../../lib/database.js'
import { makeAttachRecipeImageParamsSchema } from '../schemas/attach-recipe-image-params-schema.js'

export async function rate(request, reply) {
  const paramsSchema = makeAttachRecipeImageParamsSchema()
  const { recipeId } = paramsSchema.parse(request.params)

  const rateRecipeBodySchema = z.object({
    rating: z.coerce
      .number()
      .refine(
        (rating) => rating >= 1 && rating <= 5,
        'A avaliação deve ser um número de 1 a 5.',
      ),
  })
  const { rating } = rateRecipeBodySchema.parse(request.body)

  await prisma.ratingsOfRecipe.create({
    data: {
      recipe_id: recipeId,
      rating,
    },
  })
  return reply.status(201).send({ rating })
}
