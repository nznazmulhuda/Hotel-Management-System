import { RequestHandler } from "express";
import { User } from "../modules/user/user.model";

export const checkUserIsActive: RequestHandler = async (req, res, next) => {
  try {
    const user = (req as any).user;

    if (!user || !user.username) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Username missing in token",
      });

      return;
    }

    const existingUser = await User.findOne({ username: user.username });

    if (!existingUser) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });

      return;
    }

    if (!existingUser.isActive) {
      res.status(403).json({
        success: false,
        message: "Your account is inactive. Contact admin.",
      });

      return;
    }

    next(); // ✅ User is active, allow access
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

    return;
  }
};
