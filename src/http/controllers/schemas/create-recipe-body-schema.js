import { z } from 'zod'

export function makeCreateRecipeBodySchema() {
  return z.object({
    authorId: z.string().uuid(),
    recipeName: z.string().max(50),
    description: z.string().max(300),
    categories: z.array(z.string()),
    ingredients: z.array(
      z.object({
        ingredientName: z.string(),
        quantity: z.coerce.number(),
        unity: z.string(),
      }),
    ),
    preparationTime: z.coerce.number(),
    preparationInstructions: z.string().max(800),
    portions: z.coerce.number(),
    nutritionalValue: z.coerce.number(),
    cookingMethod: z.string(),
  })
}
