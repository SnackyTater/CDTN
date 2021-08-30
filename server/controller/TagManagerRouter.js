const express = require('express');
const router = express.Router();

//multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});

//include DB controllers
const testController = require('../DB/controller');

//get sth from db
router.get('/', (req, res) => {
    res.send({type: 'GET'});
});

router.post('/', upload.single('image'), (req, res) => {
    console.log(req.file);
    testController.saveToDB(req.body).then((data) => {
        console.log(data);
        res.send(data);
    }).catch((err) => {
        console.log(err);
    })
});

module.exports = router;