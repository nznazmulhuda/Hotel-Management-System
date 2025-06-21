import { z } from "zod";

/* -------- Shared fields -------- */
export const bookingBaseSchema = z.object({
  roomId: z.preprocess(Number, z.number().int().positive()),
  guestId: z.preprocess(Number, z.number().int().positive()),
  source: z.enum(["WALK_IN", "ONLINE", "AGENT"]),
  checkInDate: z.coerce.date(),
  checkOutDate: z.coerce.date(),
});

/* -------- Create Booking Schema -------- */
export const bookingCreateSchema = bookingBaseSchema.refine(
  (data) => data.checkOutDate > data.checkInDate,
  {
    message: "checkOutDate must be after checkInDate",
    path: ["checkOutDate"],
  }
);

/* -------- Update Booking Schema -------- */
export const bookingUpdateSchema = bookingBaseSchema.partial().extend({
  id: z.preprocess(Number, z.number().int().positive()),
});

/* -------- Availability Query -------- */
export const availabilitySchema = z
  .object({
    roomId: z.preprocess(Number, z.number().int().positive()),
    checkIn: z.coerce.date(),
    checkOut: z.coerce.date(),
  })
  .refine((d) => d.checkOut > d.checkIn, {
    message: "checkOut must be after checkIn",
    path: ["checkOut"],
  });
