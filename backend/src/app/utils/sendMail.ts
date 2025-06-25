import nodemailer from "nodemailer";
import config from "../config";

export const sendMail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.user_mail, // e.g., "yourname@gmail.com"
      pass: config.user_pass, // Gmail App Password (not your real password!)
    },
  });

  await transporter.sendMail({
    from: `"Hotel management" <${config.user_mail}>`,
    to,
    subject,
    html,
  });
};
