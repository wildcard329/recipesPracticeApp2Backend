const getRecipesScript = 'SELECT * FROM recipes ORDER BY name ASC';
const getRecipeByIdScript = 'SELECT * FROM recipes WHERE id = $1';
const createRecipeScript = 'INSERT INTO recipes (name, description, author) VALUES ($1, $2, $3)';
const updateRecipeScript = 'UPDATE recipes SET name = $1, description = $2, author = $3 WHERE id = $4';
const deleteRecipeScript = 'DELETE FROM recipes WHERE id = $1';

module.exports = {
    getRecipesScript,
    getRecipeByIdScript,
    createRecipeScript,
    updateRecipeScript,
    deleteRecipeScript
};
