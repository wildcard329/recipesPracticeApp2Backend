const express = require('express');
const cors = require('cors');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'recipesdatabase',
    password: 'P@$$w0rd123',
    port: 5432
})

const server = express();

server.use(express.json());
server.use(cors());

server.get('/api/users/all', (req, res) => {
    pool.query('SELECT * FROM users ORDER BY username ASC', (error, results) => {
        if (error) {
            console.error(error.message)
            throw error;
        }
        res.status(200).json(results.rows)
    });
});

server.post('/api/users/create', (req, res) => {
    pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, password, email], (error, results) => {
        if (error) {
            console.log(error.message)
            throw error;
        }
        res.status(201).send(`User created`)
    })
})

module.exports = server;
