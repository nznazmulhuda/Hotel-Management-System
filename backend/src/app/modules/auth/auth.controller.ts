import jwt, { SignOptions } from "jsonwebtoken";
import { User } from "../user/user.model";
import config from "../../config";

export class AuthService {
  static async login(payload: ILoginRequest): Promise<ILoginResponse> {
    const { username, password } = payload;

    // Find user with password (password is select: false by default)
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      throw new Error("User not found");
    }

    // Validate password via model method
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    if (!config.jwt_secret_key) {
      throw new Error("JWT_ACCESS_SECRET is not set");
    }

    // Sign JWT with options
    const signOptions: SignOptions = {
      expiresIn: Number(config.jwt_access_expires_in) || "1h",
    };

    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      config.jwt_secret_key,
      signOptions
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
}
