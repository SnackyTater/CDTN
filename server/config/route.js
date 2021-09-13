const { request } = require('express');
const express = require('express');
const router = express.Router();

router.use('/api/profile', require('../route/profile'));
router.use('/api', require('../route/home'));
router.use('/api', require('../route/auth'));

module.exports = router