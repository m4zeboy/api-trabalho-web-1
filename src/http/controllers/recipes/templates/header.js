export const header = `
<header class=" container-fluid pt-2 pb-2 bg-body-secondary">
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/public/"><strong>Receitas</strong></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
       aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
       <a class="nav-link" href="/public/register/">Registrar</a>
      </li>
      <li class="nav-item">
       <a class="nav-link" href="/public/login/">Entrar</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/public/recipes/create">Criar receitas</a>
      </li>
    </ul>
    <form class="d-flex">
      <div class="input-group">
        <input class="form-control" type="search" aria-label="Search">
        <button class="btn btn-outline-secondary" type="submit">Pesquisar</button>
      </div>
    </form>
    </div>
    </div>
  </nav>
</header>
  `
