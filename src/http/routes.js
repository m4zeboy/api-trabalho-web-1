import { authenticate } from './controllers/authenticate.js'
import { createRecipe } from './controllers/create-recipe.js'
import { createUsers } from './controllers/create-user.js'

export async function appRoutes(app) {
  app.post('/users', createUsers)
  app.post('/sessions', authenticate)
  app.post('/recipes', createRecipe)
}
