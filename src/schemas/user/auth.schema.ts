import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const passwordSchema = zod.string()
    .min(8, 'Password must be at least 8 characters long')
    .nonempty('Password is required');

const confirmPasswordSchema = zod.string()
    .nonempty('Confirm password is required');

const emailSchema = zod.string()
.min(1, { message: "This is required" })
.email({ message: "Must be a valid email" });

const jobTitleSchema = zod.object({
  title: zod.string().nonempty('Job title is required'),
  id: zod.string().nonempty('Job level is required')
});

export const loginSchema = toTypedSchema(
  zod.object({
    email: emailSchema,
    password: passwordSchema,
  }),
);

export const signUpSchema = toTypedSchema(
    zod.object({
        first_name: zod.string()
            .min(1, 'First name is required')
            .max(50, 'First name cannot exceed 50 characters'),
        last_name: zod.string()
            .min(1, 'Last name is required')
            .max(50, 'Last name cannot exceed 50 characters'),
        email: emailSchema,
        job_title: jobTitleSchema,
        address: zod.string().optional(),
        address_detail: zod.string().optional(),
        password: passwordSchema,
        confirmPassword: confirmPasswordSchema,
    })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords don't match",
            path: ["confirmPassword"],
        })
);