const createIngredientScript = 'INSERT INTO ingredients (name, recipe) VALUES ($1, $2)';
const getRecipeIngredientsScript = 'SELECT * FROM ingredients WHERE recipe = $1';
const deleteIngredientsScript = 'DELETE FROM ingredients WHERE recipe = $1';

module.exports = {
    createIngredientScript,
    getRecipeIngredientsScript,
    deleteIngredientsScript
};
