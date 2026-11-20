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


export type BookingInput = z.infer<typeof BookingSchema>;

export async function createBookingService(rawInput: unknown) {
  // 1. Zod runtime validation
  const result = BookingSchema.safeParse(rawInput);
  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? '_form');
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key].push(issue.message);
    }
    return {
      success: false as const,
      errors: fieldErrors
    };
  }

  // 2. Database persistence
  // const saved = await db.booking.create({ data: result.data });
  const saved = {
    id: crypto.randomUUID(),
    ...result.data,
    createdAt: new Date(),
  };

  return {
    success: true as const,
    data: saved,
  };
}