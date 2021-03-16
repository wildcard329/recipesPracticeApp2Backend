const router = require('express').Router();
const bcrypt = require('bcrypt');
const users = require('../repositories/userRepository.js');
const auth = require('../middleware/authFunc.js');

router.post('/register', async (req, res) => {
    try {
        let {username, password, email, created_on} = req.body;
        
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

router.post('/login', async (req, res) => {
    const {username, password, last_login} = req.body;

    users.getUserByUsername(username)
        .then(results => {
            if (results.rows.length) {
                user = results.rows[0]

                if (user && bcrypt.compareSync(password, user.password)) {
                    const token = auth.generateToken(user);
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

module.exports = router;
