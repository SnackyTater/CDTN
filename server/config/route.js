const express = require('express');
const router = express.Router();

router.use('/api/profile', require('../route/profile'));
router.use('/api/matchMaking', require('../route/matchMaking'));
router.use('/api/account', require('../route/account'));
router.use('/api/passion', require('../route/passion'));

module.exports = router