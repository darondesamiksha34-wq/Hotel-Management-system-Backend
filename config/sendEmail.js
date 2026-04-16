// // backend/config/sendEmail.js
// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com", // or your SMTP host
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_KEY,
//   },
// });

// export const sendEmail = async ({ email, subject, text, html }) => {
//   try {
//     await transporter.sendMail({
//       from: process.env.SENDER_EMAIL,
//       to: email,
//       subject,
//       text,
//       html,
//     });
//     console.log(`Email sent to ${email}`);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     console.log(error);
//     throw new Error("Failed to send email");
//   }
// };

// export { transporter };





import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const TOKEN = "5d434f849649dd45d795d050e62e1150"; // paste from Mailtrap

const transport = nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    
    sandbox: true,
    testInboxId: 4551577,
  })
);

const sender = {
  address: "darondesamiksha34@gmail.com", // can be anything in Mailtrap
  name: "StayZone",
};

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transport.sendMail({
      from: sender,
      to: [to],
      subject,
      html,
      category: "Integration Test",
    });

    console.log("Email sent:", info);
  } catch (error) {
    console.log("Mailtrap error:", error);
  }
};