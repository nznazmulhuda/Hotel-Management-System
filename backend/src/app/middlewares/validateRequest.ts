import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodTypeAny } from "zod";

const validateRequest = (schema: ZodTypeAny): RequestHandler => {
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors,
      });
    }
  };
};

export default validateRequest;
