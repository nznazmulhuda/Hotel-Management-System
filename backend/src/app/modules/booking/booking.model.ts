import { Schema, model } from "mongoose";
const BookingSchema = new Schema<IBooking>(
  {
    guest: { type: Schema.Types.ObjectId, ref: "Guest", required: true },
    itemType: { type: String, enum: ["room", "hall"], required: true },
    itemId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "itemType", // dynamic ref to either Room or Hall collection
    },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String },
    specialNote: { type: String },
  },
  { timestamps: true }
);

export const Booking = model<IBooking>("Booking", BookingSchema);
