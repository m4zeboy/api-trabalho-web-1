import { prisma } from '../../../lib/database.js'

export async function listRecipesByCategories(request, reply) {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
      CategoriesOfRecipe: {
        select: {
          recipe: {
            select: {
              id: true,
              recipe_name: true,
              created: true,
              author: {
                select: {
                  full_name: true,
                },
              },
              ImagesOfRecipe: true,
            },
          },
        },
        orderBy: {
          recipe: {
            created: 'asc',
          },
        },
        take: 3,
      },
    },
    take: 3,
  })

  return reply.status(200).send(categories)
}
