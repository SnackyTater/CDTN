const multer = require('multer');
const path = 'upload/'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({storage: storage});

module.exports = {
    upload,
    path,
}