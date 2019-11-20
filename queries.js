const { Pool } = require('pg');
require('dotenv').config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

const pool = new Pool({
  connectionString: 'postgres://khsondrikuwcmg:17e2c93bd03006877e1cfb8c8b9b8391766a9f70a8cb12f19dbb7a547e061620@ec2-54-227-249-108.compute-1.amazonaws.com:5432/d57dbsf1ee8lhr',
  ssl: true,
});

pool.on('connect', () => {
  console.log('connected to the Database');
});

module.exports = pool;
