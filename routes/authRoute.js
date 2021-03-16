const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../repositories/userRepository.js');
const secrets = require('../api/secret.js');
const auth = require('../middleware/authFunc.js');

router.post('/register', async (req, res) => {
    try {
        let {username, password, email, created_on} = req.body;
        
        // const rounds = process.env.HASH_ROUNDS || 14;
    
        // const hash = bcrypt.hashSync(password, rounds);
    
        // password = hash;
        password = await auth.saltPassword(password)

        const results = await users.getUserByEmail(email);
        
        if (!results.rows.length) {
            try {
                await users.createUser({username, password, email, created_on})
            
                res.status(201).json({msg: 'User successfully created!'})
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(400).json({msg: 'User already exists'})
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', (req, res) => {
    const {username, password, last_login} = req.body;

    users.getUserByUsername(username)
        .then(results => {
            if (results.rows.length) {
                user = results.rows[0]

                if (user && bcrypt.compareSync(password, user.password)) {
                    const token = generateToken(user);
                    const id = user.id;
                    users.updateLogin({last_login, id});
                    res.status(200).json({msg: `Welcome, ${username}`, token, user})
                } else {
                    res.status(401).json({msg: 'Invalid credentials'})
                }
            } else {
                res.status(400).json({msg: 'User not found.'})
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

function generateToken(user) {
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

module.exports = router;
