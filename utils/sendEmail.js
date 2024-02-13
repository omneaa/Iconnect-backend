const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const options = {
    from: sent_from,
    to: send_to,
    subject: subject,
    html: message,
  };

  // Send Email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;