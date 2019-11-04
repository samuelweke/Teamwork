const bcrypt = require('bcrypt');
const pool = require('../queries');

exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const {
        firstname, lastname, email,
        gender, jobRole, department, address,
      } = req.body;

      const query = {
        text: `INSERT INTO 
      employee (firstname, lastname, email, password, gender, job_role, department, address) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        values: [firstname, lastname, email, hash, gender, jobRole, department, address],
      };

      pool
        .query(query)
        .then(() => {
          res.status(201).json({
            message: 'User created successfully',
          });
        })
        .catch((error) => {
          res.status(400).json({
            error,
          });
        });
    },
  );
};
