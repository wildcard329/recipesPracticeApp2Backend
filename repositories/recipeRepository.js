const scripts = require('../scripts/recipeScripts.js');
const db = require('../pgConfig.js');

const getRecipes = () => {
    return db.query(scripts.getRecipesScript);
}

const getRecipeById = (id) => {
    return db.query(scripts.getRecipeByIdScript, [id]);
};

const getRecipesByUserId = (id) => {
    return db.query(scripts.getRecipesByUserIdScript, [id]);
};

const createRecipe = ({name, description, author, ingredients, instructions, filename}) => {
    return db.query(scripts.createRecipeScript, [name, description, author, ingredients, instructions, filename]);
};

const createIngredient = ({name, recipeId}) => {
    return db.query(scripts.createIngredientScript, [name, recipeId]);
};

const createInstruction = ({name, recipeId}) => {
    return db.query(scripts.createInstructionScript, [name, recipeId]);
};

const updateRecipe = ({name, description, author, id}) => {
    return db.query(scripts.updateRecipeScript, [name, description, author, id]);
};

const deleteRecipe = (id) => {
    return db.query(scripts.deleteRecipeScript, [id]);
};

module.exports = {
    getRecipes,
    getRecipeById,
    getRecipesByUserId,
    createRecipe,
    createIngredient,
    createInstruction,
    updateRecipe,
    deleteRecipe
};
