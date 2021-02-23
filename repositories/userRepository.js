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

const getUserByUsername = (username) => {
    return db.query(scripts.getUserByUsernameScript, [username]);
};

const createUser = ({username, password, email, created_on}) => {
    return db.query(scripts.createUserScript, [username, password, email, created_on]);
};

const editUser = ({username, password, email, id}) => {
    return db.query(scripts.updateUserScript, [username, password, email, id]);
};

const updateLogin = ({last_login, id}) => {
    return db.query(scripts.updateLoginScript, [last_login, id])
}

const deleteUser = (id) => {
    return db.query(scripts.deleteUserScript, [id]);
};

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUser,
    editUser,
    updateLogin,
    deleteUser
};
