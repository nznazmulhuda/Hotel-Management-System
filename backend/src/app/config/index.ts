import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  backend: process.env.BACKEND_URL,
  frontend: process.env.FRONTEND_URL,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_email_access_expires_in: process.env.JWT_EMAIL_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  user_mail: process.env.USER_MAIL,
  user_pass: process.env.USER_PASS,
  store_id: process.env.STORE_ID,
  store_pass: process.env.STORE_PASS,
  payment_url: process.env.PAYMENT_URL,
  bulksmsbd_api: process.env.BULKSMSBD_API_KEY,
  bulksmsbd_sid: process.env.BULKSMSBD_SENDER_ID,
};
