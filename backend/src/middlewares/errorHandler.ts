import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("ERROR:", err);
  res.status(500).json({ message: "Internal Server Error" });
};
