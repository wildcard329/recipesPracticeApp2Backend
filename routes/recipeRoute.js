const router = require('express').Router();
const recipes = require('../repositories/recipeRepository.js');
const fs = require('fs');

router.get('/all', async (req, res) => {
    try {
        const results = await recipes.getRecipes();
        await results.rows.forEach(row => {
            if (row.image !== null) {
                const image = row.image;
                row.image = fs.readFileSync(`${__dirname}/../temporary_storage/${image}`).toString('base64');
            }
        })
        res.status(200).json(results.rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    const id = await parseInt(req.params.id);

    // recipes.getRecipeById(id)
    //     .then(results => {
    //         if (results.rows.length) {
    //             if (results.rows[0].image) {
    //                 const image = results.rows[0].image;
    //                 results.rows[0].image = fs.readFileSync(`${__dirname}/../temporary_storage/${image}`).toString('base64');
    //             }
    //             res.status(200).json(results.rows[0]);
    //         } else {
    //             res.status(404).json({msg: `Could not find recipe with id ${id}`})
    //         }
    //     })
    //     .catch(err => {
    //         throw err;
    //     });
    try {
        const results = await recipes.getRecipeById(id);
        if (await results.rows.length) {
            const image = await results.rows[0].image;
            results.rows[0].image = await fs.readFileSync(`${__dirname}/../temporary_storage/${image}`).toString('base64');
        }
        res.status(200).json(results.rows[0]);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);

    recipes.getRecipesByUserId(id)
        .then(results => {
            if (results.rows.length) {
                results.rows.forEach(row => {
                    if (row.image !== null){
                        const image = row.image;
                        row.image = fs.readFileSync(`${__dirname}/../temporary_storage/${image}`).toString('base64');
                    }
                })
                res.status(200).json(results.rows);
            } else {
                res.status(404).json({msg: `Could not find recipes by user with id ${id}`})
            }
        })
        .catch(err => {
            throw err;
        });
});

router.post('/search', (req, res) => {
    // incomplete; needs function written in ../repositories and ../scripts
    // will not be able to search by ingredient until the ingredients 
    // functionality is written out
    const { search } = req.body;
    // recipes.getRecipes()
    //     .then(results => {
    //         if (results.rows.length) {
    //             results.rows.forEach(row => {
    //                 const query = search.toLowerCase();
    //                 console.log(row.name.toLowerCase(), query)
    //                 console.log(row.name.includes(query, 0))
    //                 return row.name.toLowerCase().includes(search.toLowerCase(), 0)
    //             })
    //             results.rows.forEach(row => {
    //                 if (row.image !== null) {
    //                     const image = row.image;
    //                     row.image = fs.readFileSync(`${__dirname}/../temporary_storage/${image}`).toString('base64');
    //                 }
    //             })
    //             res.status(200).json(results.rows)
    //         }
    //     })
})

router.post('/create', async (req, res) => {
    const {name, description, author, ingredients, instructions, filename} = req.body;
    if (req.files.file) {
        const file = req.files.file;
        file.mv(`${__dirname}/../temporary_storage/${file.name}`)
    }

    await recipes.createRecipe({name, description, author, filename})
        .then(results => {
            res.status(201).json({recipeId: `${results.rows[0].id}`});
        })
        .catch(err => {
            throw err;
        });
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {name, description, author} = req.body;

    recipes.getRecipeById(id)
        .then(results => {
            if (results.rows.length) {
                recipes.updateRecipe({name, description, author, id})
                .then(() => {
                    res.status(200).json({msg: `Recipe with id ${id} updated successfully.`});
                })
                .catch(err => {
                    res.status(500).json({msg: err})
                });
            } else {
                res.status(404).json({msg: `Could not find recipe with id ${id}.`})
            }
        })
        .catch(err => {
            throw err;
        });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    recipes.getRecipeById(id)
        .then(results => {
            if (results.rows.length) {
                recipes.deleteRecipe(id)
                    .then(() => {
                        res.status(200).json({msg: `Recipe with id ${id} successfully deleted.`});
                    })
                    .catch(err => {
                        throw err;
                    })
            } else {
                res.status(404).json({msg: `Could not find recipe with id ${id}.`});
            }
        })
        .catch(err => {
            throw err;
        });
});

module.exports = router;
