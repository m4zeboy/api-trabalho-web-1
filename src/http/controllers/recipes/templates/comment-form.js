export const commentForm = (recipe) => {
  return `
    <form id="add-comment-form" data-recipe-id="${recipe.id}">
      <div>
        <label class="form-label">Comentário</label>
        <textarea  class="form-control" id="comment"></textarea>
      </div>
      <button class="btn btn-primary mt-3">Postar</button>
    </form>
  `
}
