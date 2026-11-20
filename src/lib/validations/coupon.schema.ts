// app/contact/schema.ts
import { z } from 'zod';

export const couponSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(8, { message: 'Full name must be at least 8 characters.' })
    .max(50, { message: 'Full name cannot exceed 50 characters.' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please provide a valid email address.' }),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+?1[-.\s]?)?(?:\([2-9]\d{2}\)|[2-9]\d{2})[-.\s]?[2-9]\d{2}[-.\s]?\d{4}$/, { message: 'Please provide a valid phone number.' }),
 
});

export type CouponFormData = z.infer<typeof couponSchema>;