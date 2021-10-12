//check if username have any special character (yes => false)
const checkUsername = (username) => {
    const checker=/^[a-zA-Z0-9]+$/;
    if(username.match(checker)) return {status: false, message: 'username must not contain special character'};
    if(username.length < 8) return {status: false, message: 'username must be atleast 8 characters'};
    return {status: true, message: ''};
}

const checkEmail = (email) => {
    const checker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(checker.test(email)) return {status: true, message: ''};
    return {status: false, message: 'invalid email'};
}

const checkPassword = (password) => {
    if(password.length < 8) return {status: false, message: 'password must be atleast 8 characters'};
    return {status: true, message: ''};
}

const checkFullName = (fullName) => {
    const checker = /^[a-zA-Z\s]+$/;
    if(fullName.match(checker)) return {status: false, message: 'full name must not contain special character'}; 
    if(fullName.length <= 0) return {status: false, message: 'must enter full name'};
    return {status: true, message: ''};
}

const checkDOB = (DOB) => {
    if(DOB.length <= 0) return {status: false, message: 'must pick date of birth'};
    if(ageCalulator(DOB) < 18) return {status: false, message: 'must be 18 or older to register'};
    if(ageCalulator(DOB) > 80) return {status: false, message: 'are you sure this is your age'};
    return {status: true, message: ''};
}

const checkPassions = (passios) => {
    if(passios < 3) return {status: false, message: 'must pick atleast 3 passions'};
    return {status: true, message: ''};
}

const ageCalulator = (dob) => {
    let diff_ms = Date.now() - dob.getTime();
    let age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

export {checkUsername, checkEmail, checkPassword, ageCalulator, checkDOB, checkFullName, checkPassions};