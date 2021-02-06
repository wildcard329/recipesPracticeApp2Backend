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

router.put('/recipe/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    console.log('id: ',id,'data: ',data)

    ingredients.deleteIngredients(id)
        .then(() => {
            data.forEach(ingredient => {
                ingredients.createIngredient(ingredient.name, id)
                    .then(() => {
                        res.status(200).json({msg: 'ingredients updated successfully'})
                    })
                    .catch(err => {
                        return next(err);
                    })
            })
        })
        .catch(err => {
            throw err;
        });
});

router.delete('/recipe/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    ingredients.deleteIngredients(id)
        .then(() => {
            res.status(200).json({msg: 'Ingredients successfully removed.'})
        })
        .catch(err => {
            throw err;
        })
})

module.exports = router;
