import { model, Schema } from "mongoose";

const RoomSchema: Schema = new Schema<IRoom>(
  {
    roomNumber: { type: String, required: true, unique: true },
    floor: { type: Number, required: true },
    roomType: {
      type: String,
      enum: ["single", "double", "deluxe", "suite", "vip"],
      required: true,
    },
    bedType: {
      type: String,
      enum: ["single", "double", "king", "queen"],
      required: true,
    },
    isAvailable: { type: Boolean, default: true },
    pricePerNight: { type: Number, required: true },
    features: [String],
    description: String,
    imageUrl: [String],
    isUnderMaintenance: { type: Boolean, default: false },
    maxOccupancy: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Room = model<IRoom>("Room", RoomSchema);
