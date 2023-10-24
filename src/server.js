import Fastify from 'fastify'
import { ZodError } from 'zod'
import { appRoutes } from './routes.js'

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

app.register(appRoutes)

try {
  await app.listen({ port: 3333 })
  console.log('🤟 server is running')
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
