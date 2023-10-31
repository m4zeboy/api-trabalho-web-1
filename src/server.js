import path from 'node:path'
import Fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifyStatic from '@fastify/static'
import { ZodError } from 'zod'
import { appRoutes } from './http/routes.js'
import fastifyJwt from '@fastify/jwt'

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

app.register(fastifyJwt, {
  secret: '218h9n21end9j8fj-19dj1d0-',
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

try {
  await app.listen({ port: 3333 })
  console.log('🤟 server is running')
} catch (err) {
  console.log(err)
  process.exit(1)
}
