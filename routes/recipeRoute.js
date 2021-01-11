const router = require('express').Router();
const recipes = require('../repositories/recipeRepository.js');
const fs = require('fs');

router.get('/all', (req, res) => {
    recipes.getRecipes()
        .then(results => {
            results.rows.forEach(row => {
                if (row.image !== null){
                    const image = row.image;
                    row.image = fs.readFileSync(`${__dirname}/../temporary_storage/${image}`).toString('base64');
                }
            })
            res.status(200).json(results.rows);
        })
        .catch(err => {
            throw err;
        });
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    recipes.getRecipeById(id)
        .then(results => {
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            } else {
                res.status(404).json({msg: `Could not find recipe with id ${id}`})
            }
        })
        .catch(err => {
            throw err;
        });
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

router.post('/create', (req, res) => {
    const {name, description, author, filename} = req.body;
    console.log('author: ',author)
    if (req.files.file) {
        const file = req.files.file;
        file.mv(`${__dirname}/../temporary_storage/${file.name}`)
    }

    recipes.createRecipe({name, description, author, filename})
        .then(() => {
            res.status(201).json({msg: `Recipe created.`})
        })
        .catch(err => {
            throw err;
        });

});

// router.post('/images', (req, res) => {
//     // testing tutorial, plan to remove route later
//     const file = req.files.file
//     const filename = file.name

    
    
//     file.mv(`${__dirname}/../temporary_storage/${file.name}`, err => {
//         if (err) {
//             throw err;
//         }
//         imgBuffer = fs.readFileSync(`${__dirname}/../temporary_storage/${file.name}`);
//         imgHex = imgBuffer.toString('hex');
//         console.log('Data: ',imgHex)
//         recipes.storeImage({filename, imgHex})
//             .then(results => {
//                 res.send(results);
//             })
//             .catch(err => {
//                 throw err;
//             })
//         fs.unlink(`${__dirname}/../temporary_storage/${file.name}`, err => {
//             if (err) {
//                 throw err;
//             };
//         });
//     });
    
//     // recipes.storeImage(file.name)
//     //     .then(results => {
//     //         if (results) {
//     //             res.status(200).json({msg: 'Image successfully uploaded'})
//     //         } else {
//     //             res.status(500).json({msg: 'Could not upload image'})
//     //         }
//     //     })
//     //     .catch(err => {
//     //         throw err;
//     //     });
// });

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {name, description, author} = req.body;

    recipes.getRecipeById(id)
        .then(results => {
            if (results.rows.length) {
                recipes.updateRecipe({name, description, author})
                .then(results => {
                    if (results.rows.length) {
                        res.status(200).json({msg: `Recipe with id ${id} updated successfully.`});
                    } else {
                        res.status(500).json({msg: `Could not update recipe with id ${id}.`});
                    }
                })
                .catch(err => {
                    throw err;
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
