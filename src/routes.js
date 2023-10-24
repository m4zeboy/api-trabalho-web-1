import { createUsers } from './controllers/create-user.js'

export async function appRoutes(app) {
  app.post('/users', createUsers)
}
