const mongoose = require('mongoose');
const tag = require('./tag');

const addTag = (data) => {
    tag.create(data).then((ressult) => {
        console.log(ressult);
    }).catch((err) => {
        console.log(err.message);
    })
}

const updateTag = (tagID, data) => {
    tag.findByIdAndUpdate(tagID, data).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err.message);
    })
}

const deleteTag = (tagID) => {
    tag.findByIdAndDelete(tagID).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err.message);
    })
}

const getTagList = () => {
    return new Promise((resolve, reject) => {
        tag.find('').then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(new Error[err.message]);
        })
    })
    
}

module.exports = {
    addTag,
    updateTag,
    deleteTag,
    getTagList,
}