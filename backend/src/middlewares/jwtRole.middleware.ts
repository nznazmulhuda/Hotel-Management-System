// src/middlewares/jwtRole.middleware.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import config from "../config/env.config";

interface JwtPayload {
  userId: number;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userRole?: string;
    }
  }
}

export const jwtRoleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;

  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = auth.split(" ")[1];

    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;

    req.userId = decoded.userId;
    req.userRole = decoded.role;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/* -------------------------------------------------------------------------- */
/* Optional: role-based guard factory                                         */
/* -------------------------------------------------------------------------- */
export const authorizeRoles: any =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.userRole || "")) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
