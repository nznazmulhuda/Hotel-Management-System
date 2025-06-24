import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import config from "../../config";

export const generateToken = (payload: object, expiresIn = 1000) => {
  return jwt.sign(payload, config.jwt_secret_key!, { expiresIn });
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
};

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
