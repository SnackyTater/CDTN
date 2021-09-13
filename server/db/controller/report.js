const mongoose = require('mongoose');
const report = require('./report');

const createReport = async(accuserID, accusedID, description) => {
    try{
        let res = await report.create({accuser: accuserID, accused: accusedID, description: description});
        return res;
    } catch(err) { 
        console.log(err)
        return (err.message)
    }
}

const updatereport = async (reportID, reportName) => {
    try{
        let res = await report.findByIdAndUpdate(reportID, reportName);
        if(res != null) return res;
        throw new Error('no report was found with given ID');
    } catch(err) {
        console.log(err);
        return (err.message)
    }
}

const deletereport = async (reportID) => {
    try{
        let res = await report.deleteOne(reportID);
        if(res != null) return res;
        throw new Error('no report was found with given ID');
    } catch(err) {
        return (err.message)
    }
}

const getreportList = async() => {
    try{
        let res = await report.find();
        return res;
    } catch(err) {
        return (err.message)
    }
}

const getOneReport = async(reportID) => {
    try{
        let res = await report.findOne({_id: reportID});
        if(res != null) return res;
        throw new Error('no report was found with given ID')
    } catch(err) { 
        return (err.message)
    }
}

module.exports = {
    createReport,
    updatereport,
    deletereport,
    getreportList,
    getOneReport,
}