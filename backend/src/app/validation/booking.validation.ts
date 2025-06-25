import { z } from "zod";

// ✅ Step 1: Define core object
const bookingBaseSchema = z.object({
  guest: z.string().min(1, "Guest ID is required"),
  itemType: z.enum(["room", "hall"]),
  itemId: z.string().min(1, "Item ID is required"),
  checkInDate: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date
        ? new Date(arg)
        : undefined,
    z.date({ required_error: "Check-in date is required" })
  ),
  checkOutDate: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date
        ? new Date(arg)
        : undefined,
    z.date({ required_error: "Check-out date is required" })
  ),
  bookingStatus: z
    .enum(["pending", "confirmed", "cancelled", "completed"])
    .optional(),
  paymentStatus: z.enum(["unpaid", "paid", "refunded"]).optional(),
  totalAmount: z.number().positive("Total amount must be positive"),
  paymentMethod: z.enum(["cash", "card", "mobile-banking"]).optional(),
  specialNote: z.string().max(500).optional(),
});

// ✅ Step 2: Export .partial() from base schema
export const updateBookingSchema = bookingBaseSchema.partial();

// ✅ Step 3: Use superRefine on base schema for create
export const createBookingSchema = bookingBaseSchema.superRefine(
  (data, ctx) => {
    const now = new Date();

    if (data.checkInDate <= now) {
      ctx.addIssue({
        path: ["checkInDate"],
        code: z.ZodIssueCode.custom,
        message: "Check-in date must be in the future",
      });
    }

    if (data.checkOutDate <= data.checkInDate) {
      ctx.addIssue({
        path: ["checkOutDate"],
        code: z.ZodIssueCode.custom,
        message: "Check-out date must be after check-in date",
      });
    }
  }
);
