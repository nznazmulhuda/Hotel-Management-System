import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema: Schema<IUser> = new Schema(
  {
    name: String,
    email: String,
    number: String,
    password: String,
    username: String,
    role: {
      type: String,
      enum: [
        "admin",
        "front-desk",
        "housekeeping",
        "restaurant-staff",
        "inventory-manager",
      ],
      default: "admin",
    },
    isActive: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    otp: { type: Number, default: undefined },
    otpExpires: { type: Date, default: undefined },
  },
  { timestamps: true }
);

// 🔐 Pre-save middleware to hash password
UserSchema.pre<IUser>("save", async function (next) {
  const saltRounds = Number(config.bcrypt_salt_rounds);
  this.password = await bcrypt.hash(this.password, saltRounds);

  next();
});

// 🔐 Method to validate password
UserSchema.methods.comparePassword = async function (
  givenPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, this.password);
};

// Export the model
export const User = model<IUser>("User", UserSchema);
