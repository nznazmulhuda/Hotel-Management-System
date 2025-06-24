import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

export const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Token missing",
      });
      return; // 👈 MUST stop execution after sending response
    }

    const decoded = jwt.verify(
      token,
      config.jwt_secret_key as string
    ) as JwtPayload;

    // @ts-ignore or extend Request type properly
    req.user = {
      username: decoded.username,
      role: decoded.role,
    };

    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
    return; // 👈 again, stop execution
  }
};
