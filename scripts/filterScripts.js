const getFiltersScript = 'SELECT * FROM recipe_filters';
const addFilterScript = 'INSERT INTO recipe_filters (name) VALUES ($1)'
const getUserFiltersScript = 'SELECT * FROM user_recipe_filters';
const addUserFilterScript = 'INSERT INTO user_recipe_filters (user_id, filter_id, name) VALUES ($1, $2, $3)';

module.exports = {
    getFiltersScript,
    addFilterScript,
    getUserFiltersScript,
    addUserFilterScript
};
