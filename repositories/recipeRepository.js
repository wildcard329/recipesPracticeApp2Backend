const scripts = require('../scripts/recipeScripts.js');
const db = require('../pgConfig.js');

const getRecipes = () => {
    return db.query(scripts.getRecipesScript);
};

const getRandomSample = () => {
    return db.query(scripts.getRandomSampleScript);
};

const getRecipeById = (id) => {
    return db.query(scripts.getRecipeByIdScript, [id]);
};

const getRecipesByUserId = (id) => {
    return db.query(scripts.getRecipesByUserIdScript, [id]);
};

const getRandomSampleRecipesByUserIdScript = (id) => {
    return db.query(scripts.getRandomSampleRecipesByUserIdScript, [id]);
};

const getRecipeByType = (type) => {
    return db.query(scripts.getRecipeByTypeScript, [type]);
};

const getRandomSampleRecipeByType = (type) => {
    return db.query(scripts.getRandomSampleRecipeByTypeScript, [type]);
};

const createRecipe = ({name, description, author, filename}) => {
    return db.query(scripts.createRecipeScript, [name, description, author, filename]);
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
    getRandomSample,
    getRecipeById,
    getRecipesByUserId,
    getRandomSampleRecipesByUserIdScript,
    getRecipeByType,
    getRandomSampleRecipeByType,
    createRecipe,
    createIngredient,
    createInstruction,
    updateRecipe,
    deleteRecipe
};
