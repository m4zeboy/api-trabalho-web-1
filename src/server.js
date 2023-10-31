import path from 'node:path'
import Fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifyStatic from '@fastify/static'
import { ZodError, z } from 'zod'
import { appRoutes } from './http/routes.js'
import { prisma } from './lib/database.js'
import { ResourceNotFound } from './use-cases/errors/resource-not-found.js'

const app = Fastify()

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }
  console.error(error)

  return reply.status(500).send({ message: 'Internal Server Error' })
})

app.register(fastifyCookie)
app.register(appRoutes)

const staticPath = path
  .join(import.meta.url, '../../public/')
  .replace('file:', '')

app.register(fastifyStatic, {
  root: staticPath,
  prefix: '/public',
})

app.get('/public', async function (req, reply) {
  return reply.sendFile('index.html')
})

app.get('/public/login', async function (req, reply) {
  return reply.sendFile('register/index.html')
})

app.post('/recipes', async function (req, reply) {
  const createRecipeBodySchema = z.object({
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

  const body = createRecipeBodySchema.parse(req.body)
  try {
    // verify if author exists
    const author = await prisma.user.findUnique({
      where: { id: body.authorId },
    })
    if (!author) {
      throw new ResourceNotFound()
    }

    // verify categories

    for await (const categoryName of body.categories) {
      const category = await prisma.category.findUnique({
        where: { name: categoryName },
      })
      if (!category) {
        throw new ResourceNotFound()
      }
    }

    // create recipe
    const recipe = await prisma.recipe.create({
      data: {
        author_id: author.id,
        recipe_name: body.recipeName,
        description: body.description,
        portions: body.portions,
        cooking_method: body.cookingMethod,
        nutritional_value: body.nutritionalValue,
        preparation_instructions: body.preparationInstructions,
        preparation_time: body.preparationTime,
      },
    })

    // assign categories
    for await (const categoryName of body.categories) {
      await prisma.categoriesOfRecipe.create({
        data: {
          recipe_id: recipe.id,
          category_name: categoryName,
        },
      })
    }

    // assign ingredients
    for await (const { ingredientName, quantity, unity } of body.ingredients) {
      await prisma.ingredientsOfRecipe.create({
        data: {
          ingredient_name: ingredientName,
          quantity,
          unity,
          recipe_id: recipe.id,
        },
      })
    }
    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message })
    }
    console.log(error)
    throw error
  }
})

try {
  await app.listen({ port: 3333 })
  console.log('🤟 server is running')
} catch (err) {
  console.log(err)
  process.exit(1)
}
