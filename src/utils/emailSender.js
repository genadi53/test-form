import nodemailer from "nodemailer";
import { GMAIL_USER, GMAIL_PASS } from "../constants.js";

export const sendEmail = async (receiver, subject, html) => {
  // MailTrap
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a17975b8d293ab",
      pass: "78023f90ad1142",
    },
  });

  // Gmail
  const gmailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mainOptions = {
    from: GMAIL_USER,
    to: receiver,
    subject,
    html,
  };

  await transport.sendMail(mainOptions, function (err) {
    if (err) {
      console.log(err);
      throw err;
    } else console.log("*** New Email Was Send! ***");
  });
};
