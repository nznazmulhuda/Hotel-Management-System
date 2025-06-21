import { z } from "zod";

/* ─────────────────────────  Room-Type  ────────────────────────── */
export const roomTypeCreateSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
});
export const roomTypeUpdateSchema = roomTypeCreateSchema.partial();

/* ────────────────────────────  Room  ──────────────────────────── */
export const roomCreateSchema = z.object({
  roomNumber: z.string().min(1),
  category: z.string().optional(),
  pricePerNight: z.preprocess(
    (v) => Number(v),
    z.number().positive("pricePerNight must be a number")
  ),
  typeId: z.preprocess((v) => Number(v), z.number().int().positive()),
  status: z
    .enum(["AVAILABLE", "BOOKED", "MAINTENANCE"])
    .default("AVAILABLE")
    .optional(),
  amenities: z
    .preprocess(
      (v) => (Array.isArray(v) ? v : v ? [v] : []),
      z.array(z.string()).optional()
    )
    .optional(),
  // images handled by Multer; no need to validate here
});

export const roomUpdateSchema = z
  .object({
    id: z.preprocess((v) => Number(v), z.number().int().positive()),
    roomNumber: z.string().optional(),
    category: z.string().optional(),
    pricePerNight: z.preprocess(
      (v) => (v === undefined ? undefined : Number(v)),
      z.number().positive().optional()
    ),
    typeId: z.preprocess(
      (v) => (v === undefined ? undefined : Number(v)),
      z.number().int().positive().optional()
    ),
    status: z.enum(["AVAILABLE", "BOOKED", "MAINTENANCE"]).optional(),
    amenities: z.preprocess(
      (v) => (Array.isArray(v) ? v : v ? [v] : undefined),
      z.array(z.string()).optional()
    ),
    /** This lets you also update via plain URL array if you ever want to. */
    images: z.preprocess(
      (v) => (Array.isArray(v) ? v : v ? [v] : undefined),
      z.array(z.string()).optional()
    ),
  })
  .strict();

export const roomStatusSchema = z.object({
  status: z.enum(["AVAILABLE", "BOOKED", "MAINTENANCE"]),
});
