const express = require('express');
const router = express.Router();

router.use('/api', require('../controller/profile'));
router.use('/api', require('../controller/home'));
router.use('/api', require('../controller/signup'));
router.use('/api', require('../controller/login'));

module.exports = router