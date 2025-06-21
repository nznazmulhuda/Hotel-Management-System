import { z } from "zod";

export const hallCreateSchema = z.object({
  name: z.string().min(2),
  location: z.string().min(2),
  capacity: z.preprocess(Number, z.number().int().positive()),
  pricePerHour: z.preprocess(Number, z.number().positive()),
  pricePerDay: z.preprocess(Number, z.number().positive()),
  equipment: z.array(z.string()).optional(),
});

export const hallUpdateSchema = hallCreateSchema
  .partial()
  .extend({ id: z.preprocess(Number, z.number().int().positive()) });
