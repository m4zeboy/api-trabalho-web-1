import { z } from 'zod'

export function makeAttachRecipeImageParamsSchema() {
  return z.object({
    recipeId: z.string().uuid(),
  })
}
