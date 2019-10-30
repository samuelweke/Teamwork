const Pool = require('pg').Pool
const pool = new Pool({
  user: 'samuel',
  host: 'localhost',
  database: 'teamwork',
  password: 'Samuel1',
  port: 5432,
})

exports.getUsers = (req,res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
};