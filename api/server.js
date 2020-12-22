const express = require('express');
const cors = require('cors');
const users = require('../routes/userRoute.js');
const recipes = require('../routes/recipeRoute.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/users/', users);
server.use('/api/recipes/', recipes);

module.exports = server;
