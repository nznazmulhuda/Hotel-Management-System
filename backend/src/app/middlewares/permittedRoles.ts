import { RequestHandler } from "express";

export const permittedRoles = (...allowedRoles: string[]): RequestHandler => {
  return (req, res, next) => {
    const user = (req as any).user;

    if (!user) {
      res.status(403).json({
        success: false,
        message: "Forbidden: User not found in request",
      });

      return;
    }

    if (!allowedRoles.includes(user.role)) {
      res.status(403).json({
        success: false,
        message: "Forbidden: Insufficient role access",
      });

      return;
    }

    next();
  };
};
