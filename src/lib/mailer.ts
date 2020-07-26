import { green, red, yellow } from 'chalk';
import { createTransport } from "nodemailer";

import { Config } from './config';
import { log, logError, logWarning } from './logger';

export const sendBackInStockEmail = (productName: string, url: string, config: Config): void => {
  if (!config.email) {
    logWarning(yellow('Not sending email as no recipient has been configured\n'));
    return;
  }

  const smtpConfig = {
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: {
      user: config.email.username,
      pass: config.email.password
    }
  };


  const transporter = createTransport(smtpConfig);

  const mailOptions = {
    from: config.email.username,
    to: config.email.username,
    subject: `${productName} is Back in Stock!`,
    text: url,
    html: `<a href=${url}>${url}</a>`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      logError(red(`Error sending back in stock email`));

      console.log();
      console.error(error);
      console.log();

      return;
    }

    log(green(`Back in stock email sent to ${config.email.username}\n`));
  });
}
