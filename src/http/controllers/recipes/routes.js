import { addComment } from './add-comment.js'
import { attachRecipeImages } from './attach-recipe-images.js'
import { createRecipe } from './create-recipe.js'
import { getRecipe } from './get-recipe.js'
import { rate } from './rate.js'
import { renderRecipeDetailsPage } from './render-recipe-details-page.js'

export async function recipesRoutes(app) {
  app.get('/public/recipes/create', async (_, reply) => {
    return reply.sendFile('/recipes/create/index.html')
  })
  app.get('/public/recipes/:id', renderRecipeDetailsPage)

  app.post('/recipes', createRecipe)

  app.post('/recipes/:recipeId/images', attachRecipeImages)

  app.get('/recipes/:recipeId', getRecipe)

  app.patch('/recipes/:recipeId/rate', rate)

  app.post('/recipes/:recipeId/comments', addComment)
}
