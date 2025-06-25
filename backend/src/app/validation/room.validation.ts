import { z } from "zod";

// Create Room Validation
export const createRoomSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  floor: z.number().int().nonnegative("Floor must be a non-negative integer"),
  capacity: z.number().int().positive("Capacity must be positive"),
  pricePerNight: z.number().positive("Price per night must be positive"),
  amenities: z.array(z.string()).optional(),
  isAvailable: z.boolean().optional(),
});

// Update Room Validation (partial)
export const updateRoomSchema = createRoomSchema.partial();
