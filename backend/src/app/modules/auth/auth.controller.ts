import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateOTP, generateToken, sendMail } from "./auth.utils";
import config from "../../config";
import { User } from "../user/user.model";
import { generateEmailTemplate } from "../../utils/generateEmailTemplate";

export class AuthService {
  static async login(payload: ILoginRequest): Promise<ILoginResponse> {
    const { username, password } = payload;
    const user = await User.findOne({ username }).select("+password");

    if (!user) throw new Error("User not found");
    if (!user.isEmailVerified) throw new Error("Email not verified");

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) throw new Error("Invalid credentials");

    const accessToken = generateToken(
      { username: user.username, role: user.role },
      Number(config.jwt_access_expires_in)
    );

    return {
      accessToken,
      user: {
        id: user._id.toString(),
        name: user.name,
        username: user.username,
        role: user.role,
        isActive: user.isActive,
      },
    };
  }

  static async sendVerificationLink(email: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const token = generateToken(
      { username: user.username },
      Number(config.jwt_email_access_expires_in)
    );

    const html = generateEmailTemplate({
      title: "Verify Your Email",
      subtitle: "Please verify your account to continue using our service.",
      buttonText: "Verify Email",
      buttonLink: `${config.frontend}/verify-email?token=${token}`,
      note: "If you did not request this, you can ignore this email.",
    });

    await sendMail(user.email, "Verify Your Email", html);
  }

  static async verifyEmail(token: string) {
    const decoded = jwt.verify(token, config.jwt_secret_key as string) as any;

    const user = await User.findOne({ username: decoded.username });

    if (!user) throw new Error("Invalid token");
    user.set("isEmailVerified", true);
    await user.save();
  }

  static async forgetPassword(payload: IForgetPasswordRequest) {
    const user = await User.findOne({ email: payload.email });
    if (!user) throw new Error("User not found");
    if (!user.isEmailVerified) throw new Error("Email is not verified");

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    await user.save();

    const html = generateEmailTemplate({
      title: "Reset Your Password",
      subtitle: `Your OTP is: <strong style="color:#0d6efd">${otp}</strong>`,
      buttonText: "Reset Password",
      buttonLink: `${config.frontend}/reset-password`,
      note: "Valid for 10 minutes only.",
    });
    await sendMail(user.email, "Reset Your Password", html);
  }

  static async resetPassword(payload: IResetPasswordRequest) {
    const { email, otp, newPassword } = payload;
    const user = await User.findOne({ email }).select(
      "+otp +otpExpires +password"
    );
    if (!user || user.otp !== otp) throw new Error("Invalid OTP");
    if (user.otpExpires! < new Date()) throw new Error("OTP expired");

    user.set("password", newPassword);
    user.set("otp", undefined);
    user.set("otpExpires", undefined);

    await user.save();
  }

  static async changePassword(payload: IChangePasswordRequest) {
    const { username, oldPassword, newPassword } = payload;
    const user = await User.findOne({ username }).select("+password");
    if (!user) throw new Error("User not found");

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) throw new Error("Old password is incorrect");

    user.set("password", newPassword);

    await user.save();
  }
}
