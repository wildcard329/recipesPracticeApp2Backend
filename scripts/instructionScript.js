const getRecipeInstructionsScript = 'SELECT * FROM instructions WHERE recipe = $1';
const createInstructionScript = 'INSERT INTO instructions (name, recipe) VALUES ($1, $2)';
const deleteInstructionsScript = 'DELETE FROM instructions WHERE id = $1';

module.exports = {
    getRecipeInstructionsScript,
    createInstructionScript,
    deleteInstructionsScript
}
