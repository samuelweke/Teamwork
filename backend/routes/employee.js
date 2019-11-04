const express = require('express');

const router = express.Router();

const employeeCtrl = require('../controllers/employee');

router.post('/create-user', employeeCtrl.signup);
router.post('/signin', employeeCtrl.signin);

module.exports = router;
