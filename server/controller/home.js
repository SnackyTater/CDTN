const express = require('express');
const router = express.Router();

//when logged in
router.get('/home', (req, res) => {
    res.json({message: 'sth'});
});

//when guest

module.exports = router;