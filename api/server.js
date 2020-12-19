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

server.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
})

server.post('/api/users/create', (req, res) => {
    const {username, password, email} = req.body;

    pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, password, email], (error, results) => {
        if (error) {
            console.log(error.message)
            throw error;
        }
        res.status(201).send(`User created with id ${results.insertId}`)
    })
})

server.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {username, password, email} = req.body;

    pool.query('UPDATE users SET username = $1, password = $2, email = $3 WHERE id = $4', [username, password, email, id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`User with id ${id} updated`)
    })
})

server.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`User with id ${id} deleted.`)
    })
})

module.exports = server;
