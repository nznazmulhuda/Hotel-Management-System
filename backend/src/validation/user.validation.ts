// src/models/user.validation.ts
import { z } from "zod";
import { UserRole } from "../models/user.models";

/* ------------------------------------------------------------------------ */
/* 🚀  Shared Helpers                                                       */
/* ------------------------------------------------------------------------ */

// Bangladeshi phone format: 11 digits starting with “01…”
const bdPhoneRegex = /^01[0-9]{9}$/;

/* ------------------------------------------------------------------------ */
/* 🔐  Schemas                                                              */
/* ------------------------------------------------------------------------ */

/**
 * Validation for creating a new user
 */
export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(bdPhoneRegex, "Phone must be a valid Bangladeshi number"),
  password: z.string().min(6, "Password must be ≥ 6 characters"),
  role: z.nativeEnum(UserRole, {
    errorMap: () => ({ message: "Invalid role" }),
  }),
});

/**
 * Validation for updating an existing user
 *  – all fields optional except `id`
 */
export const updateUserSchema = z
  .object({
    id: z.number().int().positive(),
  })
  .merge(createUserSchema.partial());

/**
 * Optional schema for login
 */
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

/* ------------------------------------------------------------------------ */
/* 🧩  Inferred Types (optional)                                            */
/* ------------------------------------------------------------------------ */

export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type Login = z.infer<typeof loginSchema>;
