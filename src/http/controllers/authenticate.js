import { AuthenticateUserUseCase } from '../../use-cases/authenticate.js'
import { InvalidCredentials } from '../../use-cases/errors/invalid-credentials.js'
import { ResourceNotFound } from '../../use-cases/errors/resource-not-found.js'
import { makeAuthenticateBodySchema } from './schemas/authenticate-body-schema.js'

export async function authenticate(request, reply) {
  const authenticateBodySchema = makeAuthenticateBodySchema()
  const body = authenticateBodySchema.parse(request.body)
  try {
    const useCase = new AuthenticateUserUseCase()
    const { user } = await useCase.execute(body)
    const expires = new Date()

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply
      .setCookie('access-token', token, {
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
