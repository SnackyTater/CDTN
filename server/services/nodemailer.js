const nodemailer = require('nodemailer');
const {generateCode} = require('../scripts/utils')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cosmittodatingapp@gmail.com',
        pass: 'Cosmitto123'
    }
});

const mailOptions = (sendTo) => {
    return {
        from: 'Cosmitto Dating App',
        to: sendTo,
        subject: 'Account Verification',
        text: `your account verification code is ${generateCode(5)}`,
    }
};

const sendEmail = async (sendTo) => {
    const res = await transporter.sendMail(mailOptions(sendTo));
    return res;
};

module.exports = {
    sendEmail,
    mailOptions,
}

