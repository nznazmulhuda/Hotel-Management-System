import { Request, Response } from "express";
import { AuthService } from "./auth.controller";

export class AuthController {
  static login = async (req: Request, res: Response) => {
    try {
      const result = await AuthService.login(req.body);
      res.status(200).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  static verifyEmail = async (req: Request, res: Response) => {
    try {
      await AuthService.verifyEmail(req.query.token as string);
      res.status(200).json({ success: true, message: "Email verified" });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  static sendVerification = async (req: Request, res: Response) => {
    try {
      await AuthService.sendVerificationLink(req.body.email);
      res.status(200).json({ success: true, message: "Verification sent" });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  static forgetPassword = async (req: Request, res: Response) => {
    try {
      await AuthService.forgetPassword(req.body);
      res.status(200).json({ success: true, message: "OTP sent" });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  static resetPassword = async (req: Request, res: Response) => {
    try {
      await AuthService.resetPassword(req.body);
      res.status(200).json({ success: true, message: "Password reset" });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  static changePassword = async (req: Request, res: Response) => {
    try {
      await AuthService.changePassword(req.body);
      res.status(200).json({ success: true, message: "Password changed" });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };
}
