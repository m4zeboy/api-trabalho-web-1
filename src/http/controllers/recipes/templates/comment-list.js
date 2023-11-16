import { commentWrapper } from './comment-wrapper.js'

export const commentList = (comments) => {
  return `
    ${comments.map((comment) => `${commentWrapper(comment)}`).join('')}
    <hr>
  `
}
