import { z } from "zod";

/* ---------- Shared object ---------- */
const hallBookingBaseObject = z.object({
  guestId: z.preprocess(Number, z.number().int().positive()),
  hallId: z.preprocess(Number, z.number().int().positive()),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  bookingSource: z.enum(["WALK_IN", "ONLINE", "AGENT"]),
});

/* ---------- Create Booking Schema ---------- */
export const hallBookingCreateSchema = hallBookingBaseObject.refine(
  (v) => v.endTime > v.startTime,
  {
    message: "End date must be after start date",
    path: ["endTime"],
  }
);

/* ---------- Update Booking Schema ---------- */
export const hallBookingUpdateSchema = hallBookingBaseObject
  .extend({
    id: z.preprocess(Number, z.number().int().positive()),
  })
  .refine((v) => !v.startTime || !v.endTime || v.endTime > v.startTime, {
    message: "End date must be after start date",
    path: ["endTime"],
  });

/* ---------- Availability Check Schema ---------- */
export const hallAvailabilitySchema = z
  .object({
    hallId: z.preprocess(Number, z.number().int().positive()),
    start: z.coerce.date(),
    end: z.coerce.date(),
  })
  .refine((v) => v.end > v.start, {
    message: "End date must be after start date",
    path: ["end"],
  });
