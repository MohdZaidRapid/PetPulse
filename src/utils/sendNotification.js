// utils.js
import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const mailOptions = {
    from: "www.mohdzaid2901@gamil.com", // Replace with your email
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};
