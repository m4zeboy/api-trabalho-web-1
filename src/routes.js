import { Database } from './lib/database.js'
import { Router } from './lib/router.js'
import { randomUUID } from 'node:crypto'

export const router = new Router()

const database = new Database()

router.GET('/', async (req, res) => {
  return res.end('hello')
})

router.POST('/users', async (req, res) => {
  const { fullname, birthDate, city, state, telephone, email, password } =
    req.body
  const user = {
    id: randomUUID(),
    fullname,
    birthDate,
    city,
    state,
    telephone,
    email,
    password,
  }
  database.insert('users', user)
  return res.writeHead(201).end()
})

router.POST('/recipes', async (req, res) => {
  const {
    author,
    recipeName,
    description,
    images,
    categories,
    ingredients,
    prepareTime,
    instructions,
    portions,
    nutritionalValue,
    cookingMethod,
  } = req.body

  const recipe = {
    id: randomUUID(),
    author,
    recipeName,
    description,
    images,
    categories,
    ingredients,
    prepareTime,
    instructions,
    portions,
    nutritionalValue,
    cookingMethod,
  }

  database.insert('recipes', recipe)
  return res.writeHead(201).end()
})
