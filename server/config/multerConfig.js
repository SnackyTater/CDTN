const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDirPath = path.join(__dirname, '../../upload') //path for upload directory

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(uploadDirPath)) { fs.mkdirSync(uploadDirPath) } //check if folder exist, if not create folder
        cb(null, uploadDirPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error("only jpg, png, jpeg is supported"))
    }
    
}

const upload = multer({storage: storage, fileFilter: fileFilter, limits: {fieldSize: '2MB' }});

module.exports = {
    upload
}