const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'recipesdatabase',
    password: 'P@$$w0rd123',
    port: 5432
})

module.exports = pool;
