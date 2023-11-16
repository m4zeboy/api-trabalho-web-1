export const commentWrapper = (comment) => {
  return ` 
  <article id="${comment.id}" class="alert alert-light">
    <p ">${comment.comment}</p>
    
    <strong>${comment.user.full_name}</strong>
    <time class="text-muted">${new Date(comment.created).toLocaleDateString('pt-br') +
    ' às ' +
    new Date(comment.created).toLocaleTimeString('pt-br')
    }</time>
  </article>
  `
}
