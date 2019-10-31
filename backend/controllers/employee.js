const pool = require('../queries');

exports.getUsers = (req,res) => {
    pool.query('SELECT * FROM reflections', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
};