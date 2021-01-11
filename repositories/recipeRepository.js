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

const createRecipe = ({name, description, author, filename}) => {
    console.log('image: ',filename)
    return db.query(scripts.createRecipeScript, [name, description, author, filename]);
};

const storeImage = ({image_name, image}) => {
    console.log(`Data: ${image_name}\n${image}`)
    return db.query(scripts.storeImageScript, [image_name, image])
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
    getRecipesByUserId,
    createRecipe,
    storeImage,
    updateRecipe,
    deleteRecipe
};
