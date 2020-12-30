const jwt = require('jsonwebtoken');
const secrets = require('../api/secret.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = secrets.jwtSecret;

    if(token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                res.status(401).json({msg: 'Service not available'});
            } else {
                req.decodedToken = decodedToken;

                next();
            }
        })
    } else {
        res.status(400).json({msg: 'Invalid credentials'})
    }
}
