const categories = require('../repositories/filtersRepository.js');

class AddRecipeHelper {
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
    }
}

module.exports = AddRecipeHelper;
