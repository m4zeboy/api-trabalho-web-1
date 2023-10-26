import { authenticate } from './http/controllers/authenticate.js'
import { createUsers } from './http/controllers/create-user.js'
export async function appRoutes(app) {
  app.post('/users', createUsers)
  app.post('/sessions', authenticate)
}
