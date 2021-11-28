const cloudinary = require('../configs/cloudinary');

const uploadImage = async(filePath) => {
    const result = await cloudinary.uploader.upload(filePath, (err) => {
        return new Error(err);
    });
    return result;
}

const deleteImage = async(publicID) => {
    const result = await cloudinary.uploader.destroy(publicID, (err) => {
        return new Error(err);
    })
    return result;
}

module.exports = {uploadImage, deleteImage};