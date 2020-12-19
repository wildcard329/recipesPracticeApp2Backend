const router = require('express').Router();
const users = require('../repositories/userRepository.js');

router.get('/all', (req, res) => {
    users.getUsers()
        .then(results => {
            res.status(200).json(results.rows);
        })
        .catch(err => {
            throw err;
        });
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    users.getUserById(id)
        .then(results => {
            res.status(200).json(results.rows);
        })
        .catch(err => {
            throw err;
        });
});

router.post('/create', (req, res) => {
    const {username, password, email} = req.body;

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
                res.status(404).send(`User with email ${email} already exists.`)
            }
        })
        .catch(err => {
            throw err;
        });
});

router.put('/:id', (req, res) => {
    // present state is that the user must change email when editing, have tried to compare 
    // results.rows.email, but this comparison does not work
    const id = parseInt(req.params.id);
    const {username, password, email} = req.body;

    users.getUserById(id)
        .then(results => {
            if (results.rows.length) {
                const previousEmail = results.rows.email;

                users.getUserByEmail(email) 
                    .then(results => {
                        if (previousEmail === email || !results.rows.length) {
                            users.editUser({username, password, email, id})
                                .then(() => {
                                        res.status(200).send(`User with id ${id} updated.`);
                                })
                                .catch(err => {
                                    throw err;
                                })
                        } else {
                            res.status(400).send(`User with email ${email} already exists.`);
                        }
                    })
                    .catch(err => {
                        throw err;
                    })
            }
        })
        .catch(err => {
            throw err;
        });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    users.getUserById(id)
        .then(results => {
            if (results.rows.length) {
                users.deleteUser(id)
                    .then(() => {
                        res.status(200).send(`Deleted user with id ${id}.`);
                    })
                    .catch(err => {
                        throw err;
                    });
            } else {
                res.status(404).send(`Could not find user with id ${id}.`);
            }
        })
        .catch(err => {
            throw err;
        });
});

module.exports = router;
