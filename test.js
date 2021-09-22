const {mailOptions} = require('./server/config/nodemailer')
const mail = mailOptions('taterazay98@gmail.com', '12345678');
function getRandomInt(max) {
    return Math.floor(Math.random() * 99999);
}
console.log(getRandomInt(10));
