import { z } from "zod";

// Create Hall Validation
export const createHallSchema = z.object({
  hallName: z.string().min(1, "Hall name is required"),
  capacity: z.number().int().positive("Capacity must be positive"),
  facilities: z.array(z.string()).optional(),
  pricePerHour: z.number().positive("Price per hour must be positive"),
  isAvailable: z.boolean().optional(),
});

// Update Hall Validation (partial)
export const updateHallSchema = createHallSchema.partial();
