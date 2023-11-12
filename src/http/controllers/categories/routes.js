import { listAllCategories } from './list-all-categories.js'
import { listRecipesByCategories } from './list-recipes-by-categories.js'

export async function categoriesRoutes(app) {
  app.get('/categories/recipes', listRecipesByCategories)

  app.get('/categories', listAllCategories)
}
