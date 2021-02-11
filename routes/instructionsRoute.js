const router = require('express').Router();
const instructions = require('../repositories/instructionsRepository');

router.get('/recipe/:id/', (req, res) => {
    const id = parseInt(req.params.id)

    instructions.getInstruction(id)
        .then(results => {
            res.status(200).json(results.rows);
        })
        .catch(err => {
            throw err
        });
});

router.post('/recipe/:id/create', (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;

    data.forEach(instruction => {
        instructions.createInstruction(instruction.name, id)
            .then(() => {
                res.status(201).json({msg: 'instructions added successfully'})
            })
            .catch(err => {
                throw err;
            });
    });
});

router.put('/recipe/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;

    await instructions.getInstruction(id)
        .then(results => {
            if (results.rows.length) {
                results.rows.forEach(async instruction => {
                    await instructions.deleteInstruction(instruction.id)
                        .catch(err => {
                            res.status(500).json(err);
                        });
                });
            }
        })

    if (data.length) {
        data.forEach(instruction => {
            instructions.createInstruction(instruction.name, id)
                .catch(err => {
                    res.status(500).json(err);
                })
        })
            .then(() => {
                res.status(200).json({msg: 'instructions updated'})
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
});

router.delete('/recipe/:id', (req, res) => {
    const id = parseInt(req.params.id);

    instructions.getInstruction(id)
        .then(results => {
            if (results.rows.length) {
                results.rows.forEach(instruction => {
                    instructions.deleteInstruction(instruction.id)
                        .then(() => {
                            res.status(200).json({msg: 'ok'})
                        })
                        .catch(err => {
                            res.status(500).json(err);
                        });
                });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
