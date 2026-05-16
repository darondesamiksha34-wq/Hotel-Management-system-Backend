import nodemailer from "nodemailer";
import 'dotenv/config';


const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_KEY, 
  },
});

export const sendEmail = async ({ to, subject, text }) => {
  try {
    let info = await transporter.sendMail({
      from: process.env.SMTP_USER, // sender must match SMTP user
      to,
      subject,
      text,
    });
    console.log(" Email sent successfully:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error sending email:", err.response || err.message);
    throw err; 
  }
};