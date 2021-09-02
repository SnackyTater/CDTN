const { request } = require('express');
const express = require('express');
const router = express.Router();

router.use('/api', require('../controller/profile'));
router.use('/api', require('../controller/home'));
router.use('/api', require('../controller/auth'));

module.exports = router