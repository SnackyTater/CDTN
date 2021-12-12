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
    return {
        from: 'Cosmitto Dating App',
        to: sendTo,
        subject: 'Reset Password',
        text: `click this link bellow to reset password http://${process.env.HOST + '/' + id}`,
    }
}

const sendEmail = async ({email, option}) => {
    try{
        const {mail, code} = (option.type === 'verificate') ? mailVerificate(email) : mailResetPassword(email, option.requestID);
        const res = await transporter.sendMail(mail);
        if(res) return code;
    } catch(err) {
        console.log(err);
        return new Error(err.message)
    }
};

module.exports = {
    sendEmail,
}

