import { z } from 'zod'

export function makeGetRecipeParamsSchema() {
  return z.object({
    recipeId: z.string(),
  })
}
