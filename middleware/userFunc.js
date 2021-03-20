const users = require('../repositories/userRepository.js');

class UserFunctions {
    static findUsername(uname) {
        const results = users.getUserByUsername(uname);
    
        return results.rows[0];
    };
    static findUserById(id) {
        const results = users.getUserById(id);

        return results.rows[0];
    };
    static findUserByEmail(email) {
        const results = users.getUserByEmail(email);

        return results.rows[0];
    };
};

module.exports = UserFunctions;
