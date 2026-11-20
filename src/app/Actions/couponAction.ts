'use server';
import { couponSchema } from '../../lib/validations/coupon.schema';
import { revalidatePath } from "next/cache";
import { Resend } from 'resend';
import { sql } from '@/lib/db';

const resend = new Resend(process.env.RESEND_API_KEY);

export type ActionResponse = {
  success: boolean;
  errors?: Record<string, string>;
  message?: string;
};
export async function couponAction(_prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {

  // Convert FormData to a plain object
  const data = Object.fromEntries(formData.entries());
  // validate cloudfare token


  const token = formData.get('cloudflareToken');
  // if (!token) {
  //     return { success: false, message: 'Security check missing. Please retry.' };
  // }
  // try {
  //     // 2. Validate token directly with Cloudflare from the server
  //     const cloudflareResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //         body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
  //     });

  //  const verificationResult = await cloudflareResponse.json();

  // 3. Reject if Cloudflare flags it as a bot
  // if (!verificationResult.success) {
  //     return { success: false, message: 'Bot verification failed. Please try again.' };
  // }

  const validatedData = couponSchema.safeParse(data);
  console.log(validatedData);
  // Here you would typically send the data to your backend or perform other actions
  if (!validatedData.success) {
    const fieldErrors: Record<string, string> = {};
    validatedData.error.issues.forEach((err) => {
      const fieldName = err.path[0] as string;
      fieldErrors[fieldName] = err.message;
    });
    return {
      success: false,
      errors: fieldErrors,
    };
  }

  const { fullName, email, phone } = validatedData.data;
  //verify if not already availed one 

  const response = await fetch(`http://localhost:3000/api/coupons?email=${encodeURIComponent(email)}`,
    {
      cache: 'no-store'
    });

  const existingResult = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: 'Unable to verify your coupon. Please try again.',
    };
  }

  if (existingResult.exists) {
    return {
      success: false,
      message: existingResult.message,
    };
  }


  try {


    const response = await fetch("http://localhost:3000/api/coupons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    });

    const responseText = await response.text();

    console.log("API status:", response.status);
    console.log("API content-type:", response.headers.get("content-type"));
    console.log("API response:", responseText);

    const result = await response.json();

    if (response.ok && result.success) {
      console.log("Coupon submitted successfully", result.data);
    } else {
      console.error("Coupon submission failed:", result.error);
    }


  } catch (error) {
    console.error("API request failed:", error);
  }
  // try {

  //     const templateId = 'cc405689-e1d7-4ae8-8bda-2eff1c879164'
  //     // const { fullName, email, subject, message } = validatedData.data;
  //     const { error } = await resend.emails.send({
  //         from: 'Next-Js Contact Form <akberali@akberalikhan.com>',
  //         to: validatedData.data.email,
  //         template: {
  //             id: templateId,
  //             variables: {
  //                 FullName: validatedData.data.fullName,
  //                 Phone: validatedData.data.phone,
  //                 SenderEmail:validatedData.data.email
  //             },
  //         },
  //     });

  //     if (error) {
  //         return {
  //             success: false,
  //             message: `Failed to deliver email: ${error.message}`,
  //         };
  //     }

  //     return {
  //         success: true,
  //         message: 'Thank you! Your message has been sent successfully.',
  //     };
  // } catch {
  //     return {
  //         success: false,
  //         message: 'An unexpected server error occurred. Please try again later.',
  //     };
  // }
  return {
    success: true,
    message: 'Thank you! Your message has been sent successfully.',
  };


  // } catch (error) {
  //     console.error('Turnstile verification error:', error);
  //     return { success: false, message: 'Internal server security error.' };
  // }



  // Validate the data


}
