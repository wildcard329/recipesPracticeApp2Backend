const scripts = require('../scripts/recipeScripts.js');
const db = require('../pgConfig.js');

const getRecipes = () => {
    return db.query(scripts.getRecipesScript);
}

const getRecipeById = (id) => {
    return db.query(scripts.getRecipeByIdScript, [id]);
};

const createRecipe = ({name, description, author}) => {
    return db.query(scripts.createRecipeScript, [name, description, author]);
};

const storeImage = (image) => {
    file.mv('../images/', image)
}

const updateRecipe = ({name, description, author, id}) => {
    return db.query(scripts.updateRecipeScript, [name, description, author, id]);
};

const deleteRecipe = (id) => {
    return db.query(scripts.deleteRecipeScript, [id]);
};

module.exports = {
    getRecipes,
    getRecipeById,
    createRecipe,
    storeImage,
    updateRecipe,
    deleteRecipe
};
