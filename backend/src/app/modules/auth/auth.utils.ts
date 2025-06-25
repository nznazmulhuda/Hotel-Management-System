import jwt from "jsonwebtoken";
import config from "../../config";

export const generateToken = (payload: object, expiresIn = 1000) => {
  return jwt.sign(payload, config.jwt_secret_key!, { expiresIn });
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
};
