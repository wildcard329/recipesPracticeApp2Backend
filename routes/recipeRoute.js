const router = require('express').Router();
const recipes = require('../repositories/recipeRepository.js');
const filters = require('../repositories/filtersRepository.js');
const ingredientsHandler = require('../repositories/ingredientsRepository.js');
const instructionsHandler = require('../repositories/instructionsRepository.js');
const Randomizer = require('../middleware/randomElement.js');
const RecipeHelper = require('../middleware/recipeFunc.js');
const fs = require('fs');

router.get('/:id/browse', async (req, res) => {
    const id = parseInt(req.params.id);
    // This function is getting very big, will try again in the morning
    // right now I have no idea what works, but the intent is to pass the 
    // users id in req.params and return a sample of 50 random recipes,
    // 10 random from all recipes, 10 random from the user, and 30 random from 
    // filters, for now filters have been populated, but in the future, they will
    // populate when a user submits a new type of recipe or when a user enters a 
    // specific recipe search
    try {
        // allfilters will get filtered so filters are not repeated, had to use let instead of const
        let allFilters = []
        const searchFilters = []
        const sample = []

        // sets filters that will be used in sample query
        const recipeFilters = await filters.getFilters();
        await recipeFilters.rows.map(async row => {
            await allFilters.push(row.name);
        })

        // sets vars used to query db
        const recipeFilter1 = await Randomizer.returnRandomElement(allFilters);
        searchFilters.push(recipeFilter1);
        allFilters = await Randomizer.filterElement(recipeFilter1, allFilters);
        const recipeFilter2 = await Randomizer.returnRandomElement(allFilters);
        searchFilters.push(recipeFilter2);
        allFilters = await Randomizer.filterElement(recipeFilter2, allFilters);
        const recipeFilter3 = await Randomizer.returnRandomElement(allFilters);
        searchFilters.push(recipeFilter3);
        allFilters = await Randomizer.filterElement(recipeFilter3, allFilters);
        sample.push(searchFilters);

        // random sample of all recipes, max 10
        const results = await recipes.getRandomSample();
        await results.rows.map(row => {
            if (row.image !== null) {
                const image = row.image;
                row.image = fs.readFileSync(`${__dirname}/../temporary_storage/${image}`).toString('base64');
            }
        })
        await sample.push(results.rows)

        // random sample of all recipes by user, max 10
        const userResults = await recipes.getRandomSampleRecipesByUserIdScript(id);
        await userResults.rows.map(row => {
            if (row.image !== null) {
                const image = row.image;
                row.image = fs.readFileSync(`${__dirname}/../temporary_storage/${image}`).toString('base64');
            }
        })
        await sample.push(userResults.rows);

        // random sample of recipes which have a type of the first filter, max 10
        const filter1Results = await recipes.getRandomSampleRecipeByType(recipeFilter1);
        await filter1Results.rows.map(row => {
            if (row.image !== null) {
                const image = row.image;
                row.image = fs.readFileSync(`${__dirname}/../temporary_storage/${image}`).toString('base64');
            }
        })  
        await sample.push(filter1Results.rows);

        // random sample of recipes which have a type of the second filter, max 10
        const filter2Results = await recipes.getRandomSampleRecipeByType(recipeFilter2);
        await filter2Results.rows.map(row => {
            if (row.image !== null) {
                const image = row.image;
                row.image = fs.readFileSync(`${__dirname}/../temporary_storage/${image}`).toString('base64');
            }
        })   
        await sample.push(filter2Results.rows);

        // random sample of recipes which have a type of the third filter, max 10
        const filter3Results = await recipes.getRandomSampleRecipeByType(recipeFilter3);
        await filter3Results.rows.map(row => {
            if (row.image !== null) {
                const image = row.image;
                row.image = fs.readFileSync(`${__dirname}/../temporary_storage/${image}`).toString('base64');
            }
        })   
        await sample.push(filter3Results.rows);
        
        // sample should contain up to 50 recipes, will display when the user logs in
        res.status(200).json(sample);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/all', async (req, res) => {
    try {
        const results = await recipes.getRecipes();
        await results.rows.map(row => {
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

    try {
        const results = await recipes.getRecipeById(id);
        if (await results.rows.length) {
            const image = await results.rows[0].image;
            const id = await results.rows[0].id;
            results.rows[0].image = await fs.readFileSync(`${__dirname}/../temporary_storage/${image}`).toString('base64');
            const ingredients = await ingredientsHandler.getIngredient(id)
            const instructions = await instructionsHandler.getInstructions(id)
            results.rows[0].ingredients = ingredients.rows;
            results.rows[0].instructions = instructions.rows;
        }
        res.status(200).json(results.rows[0]);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/user/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const results = await recipes.getRecipesByUserId(id);
        if (results.rows.length) {
            results.rows.map(row => {
                const image = row.image;
                row.image = fs.readFileSync(`${__dirname}/../temporary_storage/${image}`).toString('base64');
            })
            
            res.status(200).json(results.rows);
        } else {
            console.log('oops')
            res.status(404).json({msg: `Could not find recipes by user with id ${id}`})
        }
    } catch (err) {
        console.log('err: ',err)
        res.status(500).json(err);
    }
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
    const {name, type, description, author, filename} = req.body;
    if (req.files.file) {
        const file = req.files.file;
        file.mv(`${__dirname}/../temporary_storage/${file.name}`)
    }
    
    // RecipeHelper.compareCategory(type);
    
    // recipes.createRecipe({name, type, description, author, filename})
    // .then(results => {
    //     res.status(201).json({recipeId: `${results.rows[0].id}`});
    // })
    // .catch(err => {
    //     throw err;
    // });
    try {
        await RecipeHelper.compareCategory(type)
        const results = await recipes.createRecipe({name, type, description, author, filename})    
        
        res.status(201).json({recipeId: `${results.rows[0].id}`});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const {name, type, description, author, ingredients, instructions} = req.body;

    try {
        const results = await recipes.getRecipeById(id)
            if (results.rows.length) {
                await recipes.updateRecipe({name, type, description, author, id});

                res.status(200).json({msg: `Recipe with id ${id} updated successfully.`})
            } else {
                res.status(404).json({msg: `Could not find recipe with id ${id}`})
            }
    } catch (err) {
        res.status(500).json(err);
    };
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const results = await recipes.getRecipeById(id);

        if (results.rows.length) {
            recipes.deleteRecipe(id)

            res.status(200).json({msg: `Recipe with id ${id} successfully deleted`});
        } else {
            res.status(404).json({msg: `Could not find recipe with id ${id}`})
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
