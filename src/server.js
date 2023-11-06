import path from 'node:path'
import Fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifyStatic from '@fastify/static'
import { ZodError, z } from 'zod'
import { privateRoutes, publicRoutes } from './http/routes.js'
import fastifyJwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import util from 'node:util'
import { pipeline } from 'node:stream'
import fs from 'node:fs'
import { prisma } from './lib/database.js'

export const app = Fastify()

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    // console.log(error)
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }
  console.error(error)

  return reply.status(500).send({ message: 'Internal Server Error' })
})

app.register(fastifyJwt, {
  secret: '218h9n21end9j8fj-19dj1d0-',
})

app.register(fastifyCookie)

app.register(multipart, {
  limits: {
    fileSize: 8 * 1024 * 1024 * 50, // 5mb
  },
})

const staticPath = path
  .join(import.meta.url, '../../public/')
  .replace('file:', '')
app.register(fastifyStatic, {
  root: staticPath,
  prefix: '/public',
})

app.register(publicRoutes)
app.register(privateRoutes)

const pump = util.promisify(pipeline)

app.post('/recipes/:recipeId/images', async (req, res) => {
  const attachRecipeImageParamsSchema = z.object({
    recipeId: z.string().uuid(),
  })

  const { recipeId } = attachRecipeImageParamsSchema.parse(req.params)

  console.log(recipeId)

  const parts = req.files()
  for await (const part of parts) {
    const filename = path
      .join(import.meta.url, '..', 'uploads', part.filename)
      .replace('file:', '')

    await pump(part.file, fs.createWriteStream(filename))
    const imageOfRecipe = await prisma.imagesOfRecipe.create({
      data: {
        url: part.filename,
        recipeId,
      },
    })
  }
  res.send()
})

try {
  await app.listen({ port: 3333 })
  console.log('🤟 server is running')
} catch (err) {
  console.log(err)
  process.exit(1)
}
