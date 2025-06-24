import { Request, Response } from "express";
import { AuthService } from "./auth.controller";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const payload: ILoginRequest = req.body;
      const data = await AuthService.login(payload);

      res.status(200).json({
        success: true,
        message: "Login successful",
        data,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || "Login failed",
      });
    }
  }
}
