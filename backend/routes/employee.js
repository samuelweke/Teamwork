const express = require('express');
const router = express.Router();

const db = require('../queries');


const employeeCtrl = require('../controllers/employee');

router.get('/users', employeeCtrl.getUsers);

module.exports = router;