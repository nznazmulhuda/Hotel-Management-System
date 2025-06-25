import { model, Schema } from "mongoose";

const GuestSchema: Schema<IGuest> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    fathersName: { type: String, trim: true },
    husbandsName: { type: String, trim: true },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: true,
    },
    number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    age: { type: String },
    isBlackListed: {
      type: Boolean,
      default: false,
    },
    visaNumber: { type: String, unique: true },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    passportNumber: { type: String, unique: true },
    nationality: { type: String },
    nidNumber: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Guest = model<IGuest>("Guest", GuestSchema);
