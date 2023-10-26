import { AuthenticateUserUseCase } from '../../use-cases/authenticate.js'
import { InvalidCredentials } from '../../use-cases/errors/invalid-credentials.js'
import { ResourceNotFound } from '../../use-cases/errors/resource-not-found.js'
import { makeAuthenticateBodySchema } from './schemas/authenticate-body-schema.js'
import { randomUUID } from 'node:crypto'

export async function authenticate(request, reply) {
  const authenticateBodySchema = makeAuthenticateBodySchema()
  const body = authenticateBodySchema.parse(request.body)
  try {
    const useCase = new AuthenticateUserUseCase()
    await useCase.execute(body)
    const expires = new Date()
    expires.setTime(expires.getTime() + 1 * 60 * 60 * 1000)
    return reply
      .setCookie('sessionId', randomUUID(), {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
        maxAge: 60 * 60,
        expires,
      })
      .status(201)
      .send()
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(404).send({ message: err.message })
    }
    if (err instanceof InvalidCredentials) {
      return reply.status(401).send({ message: err.message })
    }
  }
}
