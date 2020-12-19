const scripts = require('../scripts/userScripts.js');
const db = require('../pgConfig.js');

const getUsers = () => {
    return db.query(scripts.getUsersScript);
};

const getUserById = (id) => {
    return db.query(scripts.getUserByIdScript, [id]);
};

const getUserByEmail = (email) => {
    return db.query(scripts.getUserByEmailScript, [email]);
};

const createUser = ({username, password, email}) => {
    return db.query(scripts.createUserScript, [username, password, email]);
};

const editUser = ({username, password, email, id}) => {
    return db.query(scripts.updateUserScript, [username, password, email, id]);
};

const deleteUser = (id) => {
    return db.query(scripts.deleteUserScript, [id]);
};

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    editUser,
    deleteUser
};
