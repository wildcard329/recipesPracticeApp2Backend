const users = require('../repositories/userRepository.js');

class UserFunctions {
    static findUsername(uname) {
        const results = users.getUserByUsername(uname);
    
        return results.rows[0];
    };
};

module.exports = UserFunctions;
