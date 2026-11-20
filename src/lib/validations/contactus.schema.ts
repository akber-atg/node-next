// app/contact/schema.ts
import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(8, { message: 'Full name must be at least 8 characters.' })
    .max(50, { message: 'Full name cannot exceed 50 characters.' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please provide a valid email address.' }),
  subject: z
    .string()
    .trim()
    .min(3, { message: 'Subject must be at least 3 characters.' })
    .max(100, { message: 'Subject cannot exceed 100 characters.' }),
  message: z
    .string()
    .trim()
    .min(30, { message: 'Message must be at least 30 characters.' })
    .max(1000, { message: 'Message cannot exceed 1000 characters.' }),
});

export type ContactFormData = z.infer<typeof contactSchema>;