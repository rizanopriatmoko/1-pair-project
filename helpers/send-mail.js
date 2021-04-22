const nodemailer = require('nodemailer');

function sendMail(email) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pairproject.01h8@gmail.com',
        pass: 'hacktiv8kiev'
      }
    });
  
    let mailOptions = {
      from: 'pairproject.01h8@gmail.com',
      to: email,
      subject: 'WELCOME!',
      text: `Welcome to our app!`
    };
  
    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      console.log('Email sent: ' + info.response);
    });
  }

module.exports = sendMail