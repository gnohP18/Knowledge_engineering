import * as zod from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const passwordSchema = zod.string()
    .min(8, 'Password must be at least 8 characters long')
    .nonempty('Password is required');

const confirmPasswordSchema = zod.string()
    .nonempty('Confirm password is required');

const jobTitles = ['Software Engineer', 'Product Manager', 'Designer', 'Data Scientist']; 
export const validationSchema = toTypedSchema(
    zod.object({
        first_name: zod.string()
            .min(1, 'First name is required')
            .max(50, 'First name cannot exceed 50 characters'),
        last_name: zod.string()
            .min(1, 'Last name is required')
            .max(50, 'Last name cannot exceed 50 characters'),
        email: zod.string()
            .email('Email is invalid')
            .nonempty('Email is required'),
        job_title: zod.string()
            .nonempty('Job Title is required')
            .refine((val) => jobTitles.includes(val), "Selected job title is invalid."),
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