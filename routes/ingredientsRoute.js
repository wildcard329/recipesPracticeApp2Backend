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

router.post('/recipe/:id/create', async (req, res) => {
    const id = parseInt(req.params.id)
    const data = req.body;

    try {
        if (data.length) {
            try {
                data.map(async ingredient => {
                    await ingredients.createIngredient(ingredient.name, id);
                })
                res.status(201).json({msg: `Success!`})
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(400).json({msg: 'No ingredients submitted.'})
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/recipe/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    
    try {
        const results = await ingredients.getIngredient(id);

        if (results.rows.length) {
            try {
                results.rows.map(async ingredient => {
                    await ingredients.deleteIngredients(ingredient.id);
                })
            } catch (err) {
                res.status(500).json(err);
            }
        }
    
        if (data.length) {
            try {
                data.map(async ingredient => {
                    await ingredients.createIngredient(ingredient.name, id);
                })
            } catch (err) {
                res.status(500).json(err);
            }
        };
    
        res.status(200).json("Success");
    } catch (err) {
        res.status(500).json(err)
    }

});

router.delete('/recipe/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    ingredients.getIngredient(id)
        .then(results => {
            if (results.rows.length) {
                results.rows.forEach(ingredient => {
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