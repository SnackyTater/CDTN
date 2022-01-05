const nodemailer = require('nodemailer');
const {generateCode} = require('../scripts/utils')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cosmittodatingapp@gmail.com',
        pass: 'Cosmitto123'
    }
});

const mailVerificate = (sendTo) => {
    const code = generateCode(5);
    return {
        mail: {
            from: 'Cosmitto Dating App',
            to: sendTo,
            subject: 'Account Verification',
            text: `your account verification code is ${code}`,
        },
        code: code
    }
};

const mailResetPassword = (sendTo, id) => {
    console.log(sendTo, id);
    return {
        mail: {
            from: 'Cosmitto Dating App',
            to: sendTo,
            subject: 'Reset Password',
            text: `click this link bellow to reset password https://${process.env.HOST + '/reset-password/' + id}, or for development environmet use this instead http://localhost:3000/reset-password/${id}`,
        }
    }
}

const sendEmail = async ({email, option}) => {
    try{
        console.log(email, option)
        const {mail, code} = (option.type === 'verificate') ? mailVerificate(email) : mailResetPassword(email, option.requestID);
        console.log(mail);
        const res = await transporter.sendMail(mail);
        if(res) return code || true;
    } catch(err) {
        console.log(err);
        throw new Error(err.message)
    }
};

module.exports = {
    sendEmail,
}

