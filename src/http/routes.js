import { prisma } from '../lib/database.js'
import { authenticate } from './controllers/authenticate.js'
import { createRecipe } from './controllers/create-recipe.js'
import { createUsers } from './controllers/create-user.js'
import { verifySession } from './middlewares/verify-session.js'
export async function publicRoutes(app) {
  app.post('/users', createUsers)

  app.post('/sessions', authenticate)
}

export async function privateRoutes(app) {
  app.addHook('onRequest', verifySession)

  app.get('/public/recipes/create', async (req, reply) => {
    return reply.sendFile('/recipes/create/index.html')
  })

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

  app.get('/me', async function (req, reply) {
    const userId = req.sub
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      return reply.status(404).send({ message: 'Usuário não encontrado' })
    }
    return reply.status(200).send(user)
  })
}
