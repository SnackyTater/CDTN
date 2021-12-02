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
    return {
        from: 'Cosmitto Dating App',
        to: sendTo,
        subject: 'Account Verification',
        text: `your account verification code is ${generateCode(5)}`,
    }
};

const mailResetPassword = (sendTo, id) => {
    return {
        from: 'Cosmitto Dating App',
        to: sendTo,
        subject: 'Reset Password',
        text: `click this link bellow to reset password http://${process.env.HOST + '/' + id}`,
    }
}

const sendEmail = async ({email, option}) => {
    try{
        const mailOptions = (option.type === 'verificate') ? mailVerificate(email) : mailResetPassword(email, option.requestID);
        const res = await transporter.sendMail(mailOptions);
        return res;
    } catch(err) {
        console.log(err);
        return new Error(err.message)
    }
};

module.exports = {
    sendEmail,
}

