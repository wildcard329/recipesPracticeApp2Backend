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

router.put('/recipe/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    console.log('data: ',data,'\nid: ',id)

    instructions.deleteInstruction(id)
        .then(() => {
            data.forEach(instruction => {
                instructions.createInstruction(instruction.name, id)
                    .then(() => {
                        res.status(200).json({msg: 'instructions updated successfully'})
                    })
                    .catch(err => {
                        return next(err);
                    });
            });
        })
        .catch(err => {
            throw err;
        });
});

router.delete('/recipe/:id', (req, res) => {
    const id = parseInt(req.params.id);

    instructions.deleteInstructions(id)
        .then(() => {
            res.status(200).json({msg: 'instructions successfully deleted'});
        });
});

module.exports = router;
