import { head } from './head.js'
import { header } from './header.js'
import { article } from './article.js'
export const html = (recipe, comments) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  ${head}
  
  <body class=" bg-dark" data-bs-theme="dark">
    ${header} 
  
    <div class=" container mt-4">
      <div class="row">
        <main class="col-md-9">
          ${article(recipe, comments)}
        </main>
        <aside class="col-md-3">
        </aside>
      </div>
    </div>
  
    <footer class="container-fluid bg-body-tertiary mt-4 p-4">
      <small>Moisés Silva de Azevedo e Henrique Cerizza &copy;</small>
    </footer>
  <script src="/public/scripts/rating.js"></script>
  <script src="/public/scripts/add-comment.js"></script>
  </body>
  
  </html>
  `
}
