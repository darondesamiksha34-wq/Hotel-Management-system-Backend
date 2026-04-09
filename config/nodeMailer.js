import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",  // Brevo SMTP host
  port: 587,                           // Port for TLS
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_KEY,
  },
});

export const sendEmail = async ({ email, subject, text }) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject,
    text,
  };
  await transporter.sendMail(mailOptions);
};