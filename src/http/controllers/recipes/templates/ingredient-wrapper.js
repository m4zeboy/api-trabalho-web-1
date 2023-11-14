export const ingredientWrapper = ({ ingredient_name, quantity, unity }) => {
  return `      
    <p>
    <span>${quantity}</span>
    <span>${unity}</span>
    <strong>${ingredient_name}</strong>
    </p>`
}
