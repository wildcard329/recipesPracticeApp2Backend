const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../repositories/userRepository.js');
const secrets = require('../api/secret.js');

router.post('/register', (req, res) => {
    let {username, password, email} = req.body;

    const rounds = process.env.HASH_ROUNDS || 14;

    const hash = bcrypt.hashSync(password, rounds);

    password = hash;

    users.getUserByEmail(email)
    .then(results => {
        if (!results.rows.length) {
            users.createUser({username, password, email})
                .then(() => {
                    res.status(201).send('User created.');
                })
                .catch(err => {
                    throw err;
                });
        } else {
            res.status(400).send(`User with email ${email} already exists.`)
        }
    })
    .catch(err => {
        throw err;
    });
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;

    users.getUserByUsername({username})
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({msg: `Welcome, ${username}`, token})
            } else {
                res.status(401).json({msg: 'Invalid credentials'})
            }
        })
        .catch(err => {
            throw err;
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
