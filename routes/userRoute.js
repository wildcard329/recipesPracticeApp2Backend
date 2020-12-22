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
            res.status(200).json(results.rows[0]);
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
                res.status(400).send(`User with email ${email} already exists.`)
            }
        })
        .catch(err => {
            throw err;
        });
});

router.put('/:id', (req, res) => {
    // Function length is due to error handling. First check is for the user, second check 
    // is for whether the user changed their email, which has a unique constraint. If the 
    // user's email is unchanged, the update goes through, if the user changed the email,
    // the database checks whether the email already exists. Function repeats and needs to 
    // be cleaned.
    const id = parseInt(req.params.id);
    const {username, password, email} = req.body;

    users.getUserById(id)
        .then(results => {
            if (results.rows.length) {
                userEmail = results.rows[0].email;

                if (email !== userEmail) {
                    users.getUserByEmail(email) 
                        .then(results => {
                            if (results.rows.length) {
                                res.status(400).send(`User with email ${email} already exists.`)
                            } else {
                                users.editUser({username, password, email, id})
                                    .then(() => {
                                        res.status(200).send(`User with id ${id} updated.`)
                                    })
                                    .catch(err => {
                                        throw err;
                                    })
                            }
                        })
                } else {
                    users.editUser({username, password, email, id})
                        .then(() => {
                            res.status(200).send(`User with id ${id} updated.`)
                        })
                        .catch(err => {
                            throw err;
                        })
                }
            } else {
                res.status(404).send(`User with id ${id} not found.`);
            }
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
