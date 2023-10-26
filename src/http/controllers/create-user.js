import { makeCreateUserBodySchema } from './schemas/create-user-body-schema.js'
import { CreateUserUseCase } from '../../use-cases/create-users.js'
import { UserAlreadyExists } from '../../use-cases/errors/user-already-exists.js'

export async function createUsers(request, reply) {
  const createUserBodySchema = makeCreateUserBodySchema()
  const body = createUserBodySchema.parse(request.body)
  console.log(body)
  try {
    const useCase = new CreateUserUseCase()
    await useCase.execute(body)
    return reply.status(201).redirect('/public')
  } catch (err) {
    if (err instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: err.message })
    }
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
