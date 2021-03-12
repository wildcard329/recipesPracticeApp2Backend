const getRecipesScript = 'SELECT * FROM recipes ORDER BY name ASC';
const getRandomSampleScript = 'SELECT * FROM recipes ORDER BY random() LIMIT 10';
const getRecipeByIdScript = 'SELECT * FROM recipes WHERE id = $1';
const getRecipesByUserIdScript = 'SELECT * FROM recipes WHERE author = $1';
const getRandomSampleRecipesByUserIdScript = 'SELECT * FROM recipes WHERE author = $1 ORDER BY random() LIMIT 10';
const getRecipeByTypeScript = 'SELECT * FROM recipes WHERE type = $1';
const getRandomSampleRecipeByTypeScript = 'SELECT * FROM recipes WHERE type = $1 ORDER BY random() LIMIT 10';
const createRecipeScript = 'INSERT INTO recipes (name, description, author, image) VALUES ($1, $2, $3, $4) RETURNING id';
const updateRecipeScript = 'UPDATE recipes SET name = $1, description = $2, author = $3 WHERE id = $4';
const deleteRecipeScript = 'DELETE FROM recipes WHERE id = $1';

module.exports = {
    getRecipesScript,
    getRandomSampleScript,
    getRecipeByIdScript,
    getRecipesByUserIdScript,
    getRandomSampleRecipesByUserIdScript,
    getRecipeByTypeScript,
    getRandomSampleRecipeByTypeScript,
    createRecipeScript,
    updateRecipeScript,
    deleteRecipeScript
};
