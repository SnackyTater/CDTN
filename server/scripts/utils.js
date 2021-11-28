const ageCalulator = (dob) => {
    let diff_ms = Date.now() - dob.getTime();
    let age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

const dobCalculator = (dob) => {
    let diff = new Date(Date.now() - dob*31536000000);
    return diff.toISOString();
}

const generateCode = (stringLength) => {
    let code = ''
    for(let index = 0; index <= stringLength; index++){
        code += Math.floor(Math.random() * 9);
    }
    return code;
}
module.exports = {
    ageCalulator,
    dobCalculator,
    generateCode,
}