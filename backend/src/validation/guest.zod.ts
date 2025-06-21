import { z } from "zod";

/* ----------  Create Guest  ---------- */
export const guestCreateSchema = z.object({
  name: z.string().min(2),
  phone: z
    .string()
    .regex(
      /^01\d{9}$/,
      "Bangladeshi phone must start with 01 and be 11 digits"
    ),
  nationality: z.string().optional(),
  idNumber: z.string().optional(),
  blacklisted: z.boolean().optional().default(false),
});

/* ----------  Update Guest  ---------- */
export const guestUpdateSchema = guestCreateSchema.partial().extend({
  id: z.preprocess((v) => Number(v), z.number().int().positive()),
});

/* ----------  Query params for search  ---------- */
export const guestSearchSchema = z.object({
  q: z.string().optional(), // name, phone, or ID search
});
