const express = require('express');
const router = express.Router();

const employeeCtrl = require('../controllers/employee');

router.post('/create-user', employeeCtrl.createUser);

module.exports = router;