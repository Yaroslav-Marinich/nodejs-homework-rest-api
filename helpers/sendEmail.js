const nodemailer = require("nodemailer");
require("dotenv").config();
const { EMAIL_APP_PASS } = process.env;

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "polyoboroten@gmail.com",
    pass: EMAIL_APP_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "polyoboroten@gmail.com" };
  await transport
    .sendMail(email)
    .then(() => {
      console.log("Email Send Success");
    })
    .catch((error) => console.log(error));
  return true;
};

module.exports = sendEmail;
