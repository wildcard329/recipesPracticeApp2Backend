const router = require('express').Router();
const instructions = require('../repositories/instructionsRepository');

router.get('/recipe/:id/', (req, res) => {
    const id = parseInt(req.params.id)

    instructions.getInstructions(id)
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

    try {
        if (data.length) {
            try {
                data.map(async instruction => {
                    await instructions.createInstruction(instruction.name, id);
                })
                res.status(201).json({msg: 'Success!'})
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(400).json({msg: 'No instructions submitted.'})
        }
    } catch (err) {
        res.status(500).json(err);
    }
    // data.forEach(instruction => {
    //     instructions.createInstruction(instruction.name, id)
    //         .then(() => {
    //             res.status(201).json({msg: 'instructions added successfully'})
    //         })
    //         .catch(err => {
    //             throw err;
    //         });
    // });
});

router.put('/recipe/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;

    try {
        const results = await instructions.getInstructions(id);

        if (results.rows.length) {
            try {
                results.rows.map(async instruction => {
                    await instructions.deleteInstruction(instruction.id);
                })
            } catch (err) {
                res.status(500).json(err)
            }
        }
    
        if (data.length) {
            try {
                data.map(async instruction => {
                    await instructions.createInstruction(instruction.name, id);
                })
            } catch (err) {
                res.status(500).json(err);
            }
        }
    
        res.status(200).json(`Updated recipe ${id}`)
    } catch (err) {
        res.status(500).json(err)
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
