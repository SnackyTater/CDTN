const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cosmittodatingapp@gmail.com',
        pass: 'Cosmitto123'
    }
});

const mailOptions = (sendTo, code) => {
    return {
        from: 'Cosmitto Dating App',
        to: sendTo,
        subject: 'Account Verification',
        text: `your account verification code is ${code}`,
    }
};

const sendEmail = async (mailOptions) => {
    const res = await transporter.sendMail(mailOptions);
    return res;
};

module.exports = {
    sendEmail,
    mailOptions,
}

