const getUsersScript = 'SELECT * FROM users ORDER BY username ASC';
const getUserByIdScript = 'SELECT * FROM users WHERE id = $1';
const getUserByEmailScript = 'SELECT * FROM users WHERE email = $1';
const getUserByUsernameScript = 'SELECT * FROM users WHERE username = $1';
const createUserScript = 'INSERT INTO users (username, password, email, created_on) VALUES ($1, $2, $3, $4)';
const updateUserScript = 'UPDATE users SET username = $1, password = $2, email = $3 WHERE id = $4';
const updateLoginScript = 'UPDATE users SET last_login = $1 WHERE id = $2';
const deleteUserScript = 'DELETE FROM users WHERE id = $1';

module.exports = {
    getUsersScript,
    getUserByIdScript,
    getUserByEmailScript,
    getUserByUsernameScript,
    createUserScript,
    updateUserScript,
    updateLoginScript,
    deleteUserScript
}
