const passion = require('../model/passion');

const addPassion = async(passionName) => {
    try{
        let res = await passion.create(passionName);
        return res;
    } catch(err) { 
        console.log(err)
        return (err.message)
    }
}

const updatePassion = async (passionID, passionName) => {
    try{
        let res = await passion.findByIdAndUpdate(passionID, passionName);
        if(res != null) return res;
        throw new Error('no passion was found with given ID');
    } catch(err) {
        console.log(err);
        return (err.message)
    }
}

const deletePassion = async (passionID) => {
    try{
        let res = await passion.deleteOne(passionID);
        if(res != null) return res;
        throw new Error('no passion was found with given ID');
    } catch(err) {
        return (err.message)
    }
}

const getPassionList = async() => {
    try{
        let res = await passion.find();
        return res;
    } catch(err) {
        return (err.message)
    }
}

const getOnePassion = async(passionID) => {
    try{
        let res = await passion.findOne({_id: passionID});
        if(res != null) return res;
        throw new Error('no passion was found with given ID')
    } catch(err) { 
        return (err.message)
    }
}

module.exports = {
    addPassion,
    updatePassion,
    deletePassion,
    getPassionList,
    getOnePassion
}