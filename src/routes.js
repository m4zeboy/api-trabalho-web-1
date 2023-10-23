import { Router } from './lib/router.js'

export const router = new Router()

router.GET('/', async (req, res) => {
  return res.end('hello')
})
