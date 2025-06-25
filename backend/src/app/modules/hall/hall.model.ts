import { Schema, model } from "mongoose";

const HallSchema = new Schema<IHall>(
  {
    hallName: { type: String, required: true },
    capacity: { type: Number, required: true },
    facilities: [{ type: String }],
    pricePerHour: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Hall = model<IHall>("Hall", HallSchema);
