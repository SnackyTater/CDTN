const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const {generateCode} = require('../scripts/utils');

const createTransport = async() => {
    const oauth2Client = new OAuth2(
        process.env.NODEMAILER_CLIENT_ID,
        process.env.NODEMAILER_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    console.log(oauth2Client);
    
    oauth2Client.setCredentials({
        refresh_token: process.env.NODEMAILER_REFRESH_TOKEN
    });

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            reject(err);
            // reject("Failed to create access token :(");
          }
          resolve(token);
        });
    });

    console.log('blin')
    const transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: 'cosmittodatingapp@gmail.com',
          accessToken,
          clientId: process.env.NODEMAILER_CLIENT_ID,
          clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
          refreshToken: process.env.NODEMAILER_REFRESH_TOKEN
        },
        tls: {
            rejectUnauthorized: false
        }
      });
    
      return transporter;
}

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
        },
        id: id
    }
}

const sendEmail = async ({email, option}) => {
    try{
        const {mail, code, id} = (option.type === 'verificate') ? mailVerificate(email) : mailResetPassword(email, option.requestID);
        let mailTranporter = await createTransport();
        const res = await mailTranporter.sendMail(mail);
        if(res) return code || id;
    } catch(err) {
        console.log(err);
        throw new Error(err.message)
    }
};

module.exports = {
    sendEmail,
}

