import { z } from "zod";

export const registerBody = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
});

export const loginBody = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});
