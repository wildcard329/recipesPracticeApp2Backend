const scripts = require('../scripts/ingredientScript.js');
const db = require('../pgConfig.js');

const getIngredient = (id) => {
    return db.query(scripts.getRecipeIngredientsScript, [id]);
};

const createIngredient = (name, id) => {
    return db.query(scripts.createIngredientScript, [name, id]);
};

const deleteIngredients = (id) => {
    return db.query(scripts.deleteIngredientsScript, [id]);
}

module.exports = {
    getIngredient,
    createIngredient,
    deleteIngredients
};
