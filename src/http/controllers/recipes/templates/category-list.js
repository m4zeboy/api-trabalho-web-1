import { categoryBadge } from './category-badge.js'

export const categoryList = (categories) => {
  return categories
    .map(({ category_name }) => categoryBadge(category_name))
    .join(' ')
}
