// textEmail.js
import nodemailer from "nodemailer";
import 'dotenv/config';

// Create a reusable transporter
const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // your SMTP user
    pass: process.env.SMTP_KEY,  // your SMTP password
  },
});

// Reusable sendEmail function
export const sendEmail = async ({ to, subject, text }) => {
  try {
    let info = await transporter.sendMail({
      from: process.env.SMTP_USER, // sender must match SMTP user
      to,
      subject,
      text,
    });
    console.log("✅ Email sent successfully:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error sending email:", err.response || err.message);
    throw err; // rethrow to handle in controller
  }
};