const mongoose = require('mongoose');
const tag = require('./tag');

const addTag = async(tagName) => {
    try{
        let res = await tag.create({name: tagName});
        return res;
    } catch(err) { 
        console.log(err)
        return (err.message)
    }
}

const updateTag = async (tagID, tagName) => {
    try{
        let res = await tag.findByIdAndUpdate(tagID, tagName);
        if(res != null) return res;
        throw new Error('no tag was found with given ID');
    } catch(err) {
        console.log(err);
        return (err.message)
    }
}

const deleteTag = async (tagID) => {
    try{
        let res = await tag.deleteOne(tagID);
        if(res != null) return res;
        throw new Error('no tag was found with given ID');
    } catch(err) {
        return (err.message)
    }
}

const getTagList = async() => {
    try{
        let res = await tag.find();
        return res;
    } catch(err) {
        return (err.message)
    }
}

const getOneTag = async(tagID) => {
    try{
        let res = await tag.findOne({_id: tagID});
        if(res != null) return res;
        throw new Error('no tag was found with given ID')
    } catch(err) { 
        return (err.message)
    }
}

module.exports = {
    addTag,
    updateTag,
    deleteTag,
    getTagList,
    getOneTag,
}