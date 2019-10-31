const express = require('express');
const router = express.Router();

const empCtrl = require('../controllers/employee');

router.get('/user', empCtrl.getUsers);

module.exports = router;