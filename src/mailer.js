import nodemailer from "nodemailer";
import config from "../config.json";

export default function sendBackInStockEmail(productName, url) {
  const smtpConfig = {
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: {
      user: config.email.username,
      pass: config.email.password
    }
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  const mailOptions = {
    from: config.email.username,
    to: config.email.username,
    subject: `${productName} is Back in Stock!`,
    text: url,
    html: `<a href=${url}>${url}</a>`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) return console.log(`[${new Date().toLocaleString()}] Error sending back in stock email...\n`);
    console.log(`[${new Date().toLocaleString()}] Back in stock email sent to ${config.email.username}\n`);
  });
}
