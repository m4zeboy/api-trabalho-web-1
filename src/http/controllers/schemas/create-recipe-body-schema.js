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
        quantity: z.number(),
        unity: z.string(),
      }),
    ),
    preparationTime: z.number(),
    preparationInstructions: z.string().max(800),
    portions: z.number(),
    nutritionalValue: z.number(),
    cookingMethod: z.string(),
  })
}
