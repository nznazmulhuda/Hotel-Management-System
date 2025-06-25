import { z } from "zod";

// create guest schema
export const createGuestZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }),
    fathersName: z.string().optional(),
    husbandsName: z.string().optional(),
    gender: z.string({ required_error: "Gender is required!" }),
    age: z.string({ required_error: "Age is required!" }),
    nationality: z.string({ required_error: "Nationality is required!" }),
    nidNumber: z.string().optional(),
    passportNumber: z.string().optional(),
    visaNumber: z.string().optional(),
    number: z
      .string({ required_error: "Number is required!" })
      .min(11, "Number must be at least 11 digits"),
    email: z.string().email().optional(),
    permanentAddress: z.string({ required_error: "Address is required!" }),
    presentAddress: z.string({ required_error: "Address is required!" }),
    isBlackListed: z.boolean(),
  }),
});

// update guest schema
export const updateGuestZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    fathersName: z.string().optional(),
    husbandsName: z.string().optional(),
    gender: z.string().optional(),
    age: z.string().optional(),
    nationality: z.string().optional(),
    nidNumber: z.string().optional(),
    passportNumber: z.string().optional(),
    visaNumber: z.string().optional(),
    number: z.string().min(11, "Number must be at least 11 digits").optional(),
    email: z.string().email().optional(),
    permanentAddress: z.string().optional(),
    presentAddress: z.string().optional(),
    isBlackListed: z.boolean().optional(),
  }),
});
