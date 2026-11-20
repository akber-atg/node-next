'use server';
import { contactSchema } from '../../lib/validations/contactus.schema';
import { revalidatePath } from "next/cache";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export type ActionResponse = {
    success: boolean;
    errors?: Record<string, string>;
    message?: string;
};
export async function contactAction(_prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {

    // Convert FormData to a plain object
    const data = Object.fromEntries(formData.entries());
    // validate cloudfare token


    const token = formData.get('cloudflareToken');
    if (!token) {
        return { success: false, message: 'Security check missing. Please retry.' };
    }
    try {
        // 2. Validate token directly with Cloudflare from the server
        const cloudflareResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
        });

        const verificationResult = await cloudflareResponse.json();

        // 3. Reject if Cloudflare flags it as a bot
        if (!verificationResult.success) {
            return { success: false, message: 'Bot verification failed. Please try again.' };
        }

        const validatedData = contactSchema.safeParse(data);
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

        try {

            const templateId = 'cc405689-e1d7-4ae8-8bda-2eff1c879164'
            // const { fullName, email, subject, message } = validatedData.data;
            const { error } = await resend.emails.send({
                from: 'Next-Js Contact Form <akberali@akberalikhan.com>',
                to: "info@mahlaha.com",
                template: {
                    id: templateId,
                    variables: {
                        FullName: validatedData.data.fullName,
                        Comments:validatedData.data.message,
                        SenderEmail:validatedData.data.email
                    },
                },
            });

            if (error) {
                return {
                    success: false,
                    message: `Failed to deliver email: ${error.message}`,
                };
            }

            return {
                success: true,
                message: 'Thank you! Your message has been sent successfully.',
            };
        } catch {
            return {
                success: false,
                message: 'An unexpected server error occurred. Please try again later.',
            };
        }

        // // 4. SUCCESS! Process the contact details here
        // console.log(`Legitimate message received from: ${name}`);
        // // Save to DB or send email...

        // return { success: true, message: 'Thank you! Your message has been sent.' };

    } catch (error) {
        console.error('Turnstile verification error:', error);
        return { success: false, message: 'Internal server security error.' };
    }



    // Validate the data


}
