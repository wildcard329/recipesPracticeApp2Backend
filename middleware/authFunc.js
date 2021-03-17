const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secret.js');

class AuthenticationFunction {
    static saltPassword(password) {
        const rounds = process.env.HASH_ROUNDS || 14;
    
        const hash = bcrypt.hashSync(password, rounds);
    
        password = hash;

        return password;
    };
    static compareUserPassword(pw, upw) {
        return bcrypt.compareSync(pw, upw);
    };
    static generateToken(user) {
        const payload = {
            userId: user.id,
            username: user.username
        };
        const secret = secrets.jwtSecret;
        const options = {
            expiresIn: '6h'
        };
        return jwt.sign(payload, secret, options);
    };
};

module.exports = AuthenticationFunction;
