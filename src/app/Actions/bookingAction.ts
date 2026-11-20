"use server";
import { z } from "zod";
import { createBookingService } from "../../lib/Services/bookingService";
import { revalidatePath } from "next/cache";

export type ActionState = {
  success: boolean;
  errors?: Record<string, string[]>;
  data?: any;
};

export async function bookAppointmentAction(_prevState: ActionState | null, formData: FormData): 
Promise<ActionState> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const rawData = Object.fromEntries(formData.entries());
  
  // Call the shared service
  const outcome = await createBookingService(rawData);

  if (!outcome.success) {
    return { success: false, errors: outcome.errors };
  }

  revalidatePath("/book-appointment");
  return { success: true, data: outcome.data };
}