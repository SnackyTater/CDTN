const { Router } = require('express');
const router = Router();

const fs = require('fs');

const {upload} = require('../middlewares/multer');
const {uploadImage, deleteImage} = require('../services/cloudinary');

router.delete('/:id', async(req, res) => {
    try{
        const result = await deleteImage(req.params.id);
        
        res.status(200).json(result);
    }catch(err){
        res.status(400).send(err.message)
    }
})

router.post('/', upload.single("image"), async(req, res) => {
    try{
        if(req.file){
            const {public_id, secure_url} = await uploadImage(req.file.path);

            await fs.unlinkSync(req.file.path);

            res.status(200).json({public_id, secure_url});
        }
        else throw TypeError('please attach image file');
    } catch(err) {
        console.log(err);
        res.status(400).send(err.message);
    }
})

module.exports = router;