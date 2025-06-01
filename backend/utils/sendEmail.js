const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,   // your email
        pass: process.env.EMAIL_PASS,   // app password (not your actual email pass!)
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log("📨 Email sent successfully");
  } catch (error) {
    console.error("❌ Email sending failed", error);
    throw new Error("Email not sent");
  }
};

module.exports = sendEmail;
