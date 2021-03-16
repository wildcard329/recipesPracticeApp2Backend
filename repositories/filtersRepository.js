const scripts = require('../scripts/filterScripts.js');
const db = require('../pgConfig.js');

const getFilters = () => {
    return db.query(scripts.getFiltersScript);
};

const addFilter = (filter) => {
    return db.query(scripts.addFilterScript, [filter]);
};

const getUserFilters = (id) => {
    return db.query(scripts.getUserFiltersScript, [id]);
};

const addUserFilter = ({filter}) => {
    return db.query(scripts.addUserFilterScript, [filter]);
};

module.exports = {
    getFilters,
    addFilter,
    getUserFilters,
    addUserFilter
}
