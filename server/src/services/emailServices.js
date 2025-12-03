const nodemailer = require("nodemailer")
const { user, pass } = require("../api/env")
const transpoter = nodemailer.createTransport({
    service : "email",
    auth:{
        user : user,
        pass : pass
    }
})

const sendMail = async (to, subject, text) => {
  try {
    await transpoter.sendMail({
      from: user,
      to: to,
      subject: subject,
      text: text,
    });
    console.log("Email sent successfully");
  } catch (err) {
    console.log("Error sending email:", err.message);
  }
};

module.exports = { transpoter, sendMail };