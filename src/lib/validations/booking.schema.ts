import { z } from 'zod';

export const BookingSchema = z.object({
  clientName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  service: z.enum([
    'Pending',
    'Confirmed',
    'Cancelled',
  ]),
  date: z.string().min(1, 'Please select a date'),
});

export type BookingInputDTO = z.infer<typeof BookingSchema>;

export interface Appointment {
  id: string;
  clientName: string;
  service: string;
  date: string;
  status: 'confirmed' | 'pending';
}