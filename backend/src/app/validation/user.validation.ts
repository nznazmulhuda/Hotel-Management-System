import { z } from "zod";

// Create User Validation Schema
export const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string().email("Invalid email format"),
    number: z.string().min(11, "Number must be at least 11 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    username: z.string(),
    role: z.enum([
      "admin",
      "front-desk",
      "housekeeping",
      "restaurant-staff",
      "inventory-manager",
    ]),
  }),
});

// Update User Validation Schema (optional fields)
export const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    number: z.string().optional(),
    password: z.string().min(8).optional(),
    username: z.string().optional(),
    role: z
      .enum([
        "admin",
        "front-desk",
        "housekeeping",
        "restaurant-staff",
        "inventory-manager",
      ])
      .optional(),
    isActive: z.boolean().optional(),
  }),
});
