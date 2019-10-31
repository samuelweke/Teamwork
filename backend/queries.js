const { Pool } = require('pg')
const pool = new Pool({
  user: 'samuel',
  host: 'localhost',
  database: 'teamwork',
  password: 'Samuel1',
  port: 5432,
});

pool.on('connect', () => {
  console.log('connected to the Database');
});


module.exports = pool;