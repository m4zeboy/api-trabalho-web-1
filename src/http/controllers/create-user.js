import { makeCreateUserBodySchema } from './schemas/create-user-body-schema.js'
import { CreateUserUseCase } from '../../use-cases/create-users.js'
import { UserAlreadyExists } from '../../use-cases/errors/user-already-exists.js'
import { InsuficientAge } from '../../use-cases/errors/insuficient-age.js'

export async function createUsers(request, reply) {
  const createUserBodySchema = makeCreateUserBodySchema()
  const body = createUserBodySchema.parse(request.body)
  try {
    const useCase = new CreateUserUseCase()
    await useCase.execute(body)
    return reply.status(201).redirect('/public')
  } catch (err) {
    console.log(err)
    if (err instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: err.message })
    }
    if (err instanceof InsuficientAge) {
      return reply.status(401).send({ message: err.message })
    }
    throw err
  }
}
