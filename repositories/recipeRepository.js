const scripts = require('../scripts/recipeScripts.js');
const db = require('../pgConfig.js');

const getRecipes = () => {
    return db.query(scripts.getRecipesScript);
}

const getRecipeById = (id) => {
    return db.query(scripts.getRecipeByIdScript(id));
};

const createRecipe = ({name, description, instructions, ingredients}) => {
    return db.query(scripts.createRecipeScript({name, description, instructions, ingredients}));
};

const updateRecipe = ({name, description, instructions, ingredients, id}) => {
    return db.query(scripts.updateRecipeScript({name, description, instructions, ingredients, id}));
};

const deleteRecipe = (id) => {
    return db.query(scripts.deleteRecipeScript(id));
};

module.exports = {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
};
