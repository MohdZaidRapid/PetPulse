// utils.js
import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
  try {
    if (!to) {
      throw new Error("Recipient's email address is not defined.");
    }

    var transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: "www.mohdzaid2901@gmail.com", // Replace with your email
      to,
      subject,
      text,
    };

    // Send mail with defined options
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
