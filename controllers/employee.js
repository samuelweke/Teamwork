const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../queries');

exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const {
        firstName, lastName, email,
        gender, jobRole, department, address,
      } = req.body;

      const query = {
        text: `INSERT INTO 
      employee (firstname, lastname, email, password, gender, job_role, department, address) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        values: [firstName, lastName, email, hash, gender, jobRole, department, address],
      };

      pool
        .query(query)
        .then((user) => {
          console.log(user);
          const token = jwt.sign(
            { userId: user.rows[0].id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' },
          );
          return res.status(200).json({
            message: 'User account successfully created',
            token,
            userId: user.rows[0].id,
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
      if (user.rows == '') {
        return res.status(401).json({
          error: 'User does not exist',
        });
      }
      return bcrypt.compare(req.body.password, user.rows[0].password)
        .then((valid) => {
          if (!valid) {
            return res.status(403).json({
              error: 'Credentials dont match',
            });
          }
          const token = jwt.sign(
            { userId: user.rows[0].id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' },
          );
          return res.status(201).json({
            token,
            userId: user.rows[0].id,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error,
          });
        });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};
