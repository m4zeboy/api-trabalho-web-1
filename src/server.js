import Fastify from 'fastify'
import z, { ZodError } from 'zod'
import { prisma } from './lib/database.js'

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

app.get('/', async function (request, reply) {
  return reply({ hello: 'world' })
})

app.post('/users', async function (request, reply) {
  const createUserBodySchema = z.object({
    fullName: z.string().refine((value) => /^[a-zA-z ]+$/.test(value), {
      message: 'Must contain only letters and spaces',
    }),
    birthDate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: 'Invalid date format',
    }),
    city: z.string().refine((value) => /^[a-zA-z ]+$/.test(value), {
      message: 'Must contain only letters and spaces',
    }),
    phoneNumber: z.string().refine((value) => /^\d{10}$/.test(value), {
      message: 'Invalid phone number format',
    }),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .refine(
        (value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/.test(value),
        {
          message: 'Invalid password format',
        },
      ),
    confirmPassword: z
      .string()
      .min(8)
      .refine(
        (value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/.test(value),
        {
          message: 'Invalid password format',
        },
      ),
  })
  const {
    birthDate,
    city,
    confirmPassword,
    email,
    fullName,
    password,
    phoneNumber,
  } = createUserBodySchema.parse(request.body)
  try {
    const userAlreadyExists = await prisma.user.findUnique({ where: { email } })
    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    // verify age
    const yearOfBirthDate = new Date(birthDate).getFullYear()
    const currentYear = new Date().getFullYear()
    const differenceInYears = Math.abs(currentYear - yearOfBirthDate)
    if (differenceInYears < 13) {
      throw new Error('You are too young to have an account.')
    }

    // verify password matches
    if (password !== confirmPassword) {
      throw new Error('The passwords do not match')
    }

    await prisma.user.create({
      data: {
        full_name: fullName,
        birth_date: new Date(birthDate),
        city,
        email,
        password,
        phone_number: phoneNumber,
      },
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }
  }
})

app.post('/recipes', async function (request, reply) {
  const {
    author,
    recipeName,
    description,
    // images,
    categories,
    ingredients,
    prepareTime,
    instructions,
    portions,
    nutritionalValue,
    cookingMethod,
  } = request.body

  const recipe = {
    id: randomUUID(),
    author,
    recipeName,
    description,
    // images,
    categories,
    ingredients,
    prepareTime,
    instructions,
    portions,
    nutritionalValue,
    cookingMethod,
  }
})

try {
  await app.listen({ port: 3333 })
  console.log('🤟 server is running')
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
