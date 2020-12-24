const getRecipesScript = 'SELECT * FROM recipes ORDER BY name ASC';
const getRecipeByIdScript = 'SELECT * FROM recipes WHERE id = $1';
const createRecipeScript = 'INSERT INTO recipes (name, description, instructions, ingredients) VALUES ($1, $2, $3, $4)';
const updateRecipeScript = 'UPDATE recipes SET name = $1, description = $2, instructions = $3, ingredients = $4 WHERE id = $5';
const deleteRecipeScript = 'DELETE FROM recipes WHERE id = $1';

module.exports = {
    getRecipesScript,
    getRecipeByIdScript,
    createRecipeScript,
    updateRecipeScript,
    deleteRecipeScript
};
