const request = require('../models/request');
const {getAccount} = require('./account');

const createRequest = async(userVerificate) => {
    const accountInfo = await getAccount(userVerificate);

    if(accountInfo){
        const requestInfo = request.create({"id": accountInfo._id});
        return requestInfo;
    }
    return new Error('no account was found with given info')
}

const getRequest = async(requestID) => {
    const requestInfo = await request.findOne({"_id": requestID});
    if(requestInfo) return requestInfo;
    return new Error('no request was found');
}

const deleteRequest = async(requestID) => {
    const requestStatus = await request.deleteOne({"_id": requestID});
    return requestStatus
}

module.exports = {
    createRequest,
    getRequest,
    deleteRequest,
}