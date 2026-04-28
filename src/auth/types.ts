import { z } from "zod";

export const RegistrationSchema = z
  .object({
    name: z.string().trim().min(6).max(32),
    email: z.string().email().trim().max(64),
    password: z.string().min(8).max(32).regex(/[A-Z]/, "Must include uppercase").regex(/[0-9]/, "Must include number"),
    passwordConfirmation: z
      .string()
      .min(8)
      .max(64)
      .regex(/[A-Z]/, "Must include uppercase")
      .regex(/[0-9]/, "Must include number"),
    acceptToS: z.boolean().default(false),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export const LoginSchema = z.object({
  email: z.string().email().trim().max(64),
  password: z.string().min(8).max(64).regex(/[A-Z]/, "Must include uppercase").regex(/[0-9]/, "Must include number"),
});

export type RegistrationData = z.input<typeof RegistrationSchema>;
export type LoginData = z.input<typeof LoginSchema>;
