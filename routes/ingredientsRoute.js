const router = require('express').Router();
const ingredients = require('../repositories/ingredientsRepository');

router.get('/recipe/:id/', (req, res) => {
    const id = parseInt(req.params.id)

    ingredients.getIngredient(id)
        .then(results => {
            res.status(200).json(results.rows);
        })
        .catch(err => {
            throw err
        });
});

router.post('/recipe/:id/create', (req, res) => {
    const id = parseInt(req.params.id)
    const data = req.body;

    data.forEach(ingredient => {
        ingredients.createIngredient(ingredient.name, id)
            .then(() => {
                res.status(201).json({msg: 'ingredients added successfully'})
            })
            .catch(err => {
                throw err;
            });
    });
});

router.put('/recipe/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;

    await ingredients.getIngredient(id)
        .then(results => {
            if (results.rows.length) {
                results.rows.forEach(async ingredient => {
                    await ingredients.deleteIngredients(ingredient.id)
                        .catch(err => {
                            res.status(500).json(err);
                        })
                })
                .catch(err => {
                    res.status(500).json(err);
                });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });

    if (data.length) {
        data.forEach(ingredient => {
            ingredients.createIngredient(ingredient.name, id)
                .catch(err => {
                    res.status(500).json(err);
                })
        })
            .then(() => {
                res.status(200).json({msg: 'ingredients updated'})
            })
            .catch(err => {
                res.status(500).json(err);
            });
    };
});

router.delete('/recipe/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    ingredients.getIngredient(id)
        .then(results => {
            if (results.rows.length) {
                results.rows.forEach(ingredient => {
                    console.log('editing ingredient: ',ingredient)
                    ingredients.deleteIngredients(ingredient.id)
                })
                .catch(err => {
                    res.status(500).json(err);
                });
            }
        })
        .catch(err => {
            throw err;
        })
})

module.exports = router;
