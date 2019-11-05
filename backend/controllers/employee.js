const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../queries');

exports.signup = (req, res) => {
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

exports.signin = (req, res) => {
  pool
    .query('SELECT * FROM employee WHERE email = $1', [req.body.email])
    .then((user) => {
      if (user.rows === 0) {
        return res.status(401).json({
          error: 'User does not exist',
        });
      }
      bcrypt.compare(req.body.password, user.rows[0].password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: 'Credentials dont match',
            });
          }
        });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};
