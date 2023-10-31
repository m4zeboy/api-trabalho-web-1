import { prisma } from '../lib/database.js'
import { authenticate } from './controllers/authenticate.js'
import { createRecipe } from './controllers/create-recipe.js'
import { createUsers } from './controllers/create-user.js'

export async function appRoutes(app) {
  app.post('/users', createUsers)
  app.post('/sessions', authenticate)
  app.post('/recipes', createRecipe)
  app.get('/categories/recipes', async function (req, reply) {
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
  })
}
