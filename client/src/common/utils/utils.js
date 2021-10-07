//check if username have any special character (yes => false)
const checkUsername = (username) => {
    const checker=/^[^*|\":<>[\]{}`\\()';@&$]+$/;
    if(username.length < 8) return {status: false, message: 'username must be atleast 8 characters'};
    if(username.match(checker)) return {status: false, message: 'username must not contain special character'};
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

const ageCalulator = (dob) => {
    let diff_ms = Date.now() - dob.getTime();
    let age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

export {checkUsername, checkEmail, checkPassword, ageCalulator}