const categories = require('../repositories/filtersRepository.js');
const recipes = require('../repositories/recipeRepository.js');
const fs = require('fs');

class RecipeFunctions {
    static async compareCategory(recipeType) {
        const filters = [];
        const filterData = await categories.getFilters();
        await filterData.rows.map(async row => {
            await filters.push(row.name);
        })
        if (filters.includes(recipeType) || recipeType === '') {
            return;
        } else {
            categories.addFilter(recipeType);
        };
    };
    static findRecipeById(id) {
        const results = recipes.getRecipeById(id);

        return results.rows[0];
    };
    static findRecipesByCategory(category) {
        const results = recipes.getRecipeByType(category);

        return results.rows;
    };
    static async findAllRecipes() {
        const results = await recipes.getRecipes();

        await results.rows.map(row => {
            if (row.image !== null) {
                const image = row.image;
                row.image = fs.readFileSync(`${__dirname}/../temporary_storage/${image}`).toString('base64');
            };
        });

        console.log(results.rows);
        return results.rows;
    }
};

module.exports = RecipeFunctions;
