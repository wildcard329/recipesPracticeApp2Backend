const express = require('express');
const cors = require('cors');
const users = require('../routes/userRoute.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/users/', users);

module.exports = server;
