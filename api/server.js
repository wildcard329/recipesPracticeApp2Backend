const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const users = require('../routes/userRoute.js');
const recipes = require('../routes/recipeRoute.js');
const auth = require('../routes/authRoute.js');
const ingredients = require('../routes/ingredientsRoute.js');
const instructions = require('../routes/instructionsRoute.js');
const mw = require('../middleware/authenticate.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(fileUpload());
server.use('/api/auth/', auth)
server.use('/api/users/', users);
server.use('/api/recipes/', mw, recipes);
server.use('/api/ingredients/', ingredients);
server.use('/api/instructions/', instructions);

module.exports = server;
