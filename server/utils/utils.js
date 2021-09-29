const ageCalulator = (dob) => {
    let diff_ms = Date.now() - dob.getTime();
    let age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

const dobCalculator = (dob) => {
    let diff = new Date(Date.now() - dob*31536000000);
    return diff.toISOString();
}

const generateCode = (maxValue) => {
    return Math.floor(Math.random() * maxValue);
}

const createToken = (data) => {
    
}
module.exports = {
    ageCalulator,
    dobCalculator,
    generateCode,
}