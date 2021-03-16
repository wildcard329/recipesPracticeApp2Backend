const bcrypt = require('bcrypt');

class AuthenticationFunction {
    static saltPassword(password) {
        const rounds = process.env.HASH_ROUNDS || 14;
    
        const hash = bcrypt.hashSync(password, rounds);
    
        password = hash;

        return password;
    };
};

module.exports = AuthenticationFunction;
