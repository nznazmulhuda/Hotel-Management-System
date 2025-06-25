import { z } from "zod";

// Helper for itemType enum
const itemTypeEnum = z.enum(["room", "hall"]);

export const createBookingSchema = z.object({
  guest: z.string().min(1, "Guest ID is required"),
  itemType: itemTypeEnum,
  itemId: z.string().min(1, "Item ID is required"),
  checkInDate: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date
        ? new Date(arg)
        : undefined,
    z.date().refine((date) => date > new Date(), {
      message: "Check-in date must be in the future",
    })
  ),
  checkOutDate: z
    .preprocess(
      (arg) =>
        typeof arg === "string" || arg instanceof Date
          ? new Date(arg)
          : undefined,
      z.date()
    )
    .refine(
      (date, ctx) => {
        const checkIn = ctx.parent?.checkInDate;
        return checkIn ? date > checkIn : true;
      },
      { message: "Check-out date must be after check-in date" }
    ),
  bookingStatus: z
    .enum(["pending", "confirmed", "cancelled", "completed"])
    .optional(),
  paymentStatus: z.enum(["unpaid", "paid", "refunded"]).optional(),
  totalAmount: z.number().positive("Total amount must be positive"),
  paymentMethod: z.enum(["cash", "card", "mobile-banking"]).optional(),
  specialNote: z.string().max(500).optional(),
});

// Update Booking Validation (partial)
export const updateBookingSchema = createBookingSchema.partial();
