import { z } from "zod";

export const signupSchema = z.object({
    email: z.string().trim().toLowerCase().email("Invalid email format"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(64, "Password too long"),
    name: z
        .string()
        .trim()
        .min(1, "Name cannot be empty")
        .max(100, "Name too long")
        .optional(),
});

export const signinSchema = z.object({
    email: z.string().trim().toLowerCase().email("Invalid email format"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(64, "Password too long"),
});

export const signupDriverSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  plateNumber: z.string().min(1, "Plate number is required"),
  vehicleType: z.enum(["AFFORDABLE", "PREMIUM", "LUXURY", "BIG"], {
    errorMap: () => ({ message: "Invalid vehicle type" })
  })
})
