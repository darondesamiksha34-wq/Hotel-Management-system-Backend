// backend/config/sendEmail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", // or your SMTP host
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_KEY,
  },
});

export const sendEmail = async ({ email, subject, text, html }) => {
  try {
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject,
      text,
      html,
    });
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    console.log(error);
    throw new Error("Failed to send email");
  }
};

export { transporter };