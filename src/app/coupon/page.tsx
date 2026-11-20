// // app/contact/page.tsx
"use client";

import styles from "./contactus.module.css";
import { useActionState, useState } from "react";
import {couponAction, type ActionResponse,} from "../../app/Actions/couponAction";

import { Turnstile } from "@marsidev/react-turnstile";
import { couponSchema, CouponFormData } from "@/lib/validations/coupon.schema";

type FieldName = keyof CouponFormData;

const initialState: ActionResponse = {
  success: false,
};

export default function Coupon() {
  const [state, formAction, isPending] = useActionState(couponAction,initialState); 
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const [captchaToken, setCaptchaToken] = useState("");
  console.log(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);


 async function handleClientSubmit(e: React.FormEvent<HTMLFormElement>) {

  const formData = new FormData(e.currentTarget);

  const rawData = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };

  // Client-side validation
  const validation = couponSchema.safeParse(rawData);

  if (!validation.success) {
        e.preventDefault();
    const errors: Record<string, string> = {};

    for (const issue of validation.error.issues) {
      const field = issue.path[0] as string;
      if (!errors[field]) {
        errors[field] = issue.message;
      }
    }

    setClientErrors(errors);
    return;
  }

  // try {
  //   const response = await fetch("http://localhost:3000/api/coupons", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(rawData),
  //   });

  //   const result = await response.json();

  //   if (response.ok && result.success) {
  //     console.log("Coupon submitted successfully", result.data);
  //   } else {
  //     console.error("Coupon submission failed:", result.error);
  //   }

  //   setClientErrors({});

  // } catch (error) {
  //   console.error("API request failed:", error);
  // }
}


  function handleInputChange(fieldName: FieldName) {
    if (clientErrors[fieldName]) {
      setClientErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  }

  // Merge client errors with any returned by the server
  const activeErrors = { ...clientErrors, ...state.errors };
  return (
    <div className={styles.wrapper}>
      <form
        action={formAction}
        onSubmit={handleClientSubmit}
        className={styles.form}
      >
        {/* Top row: 3 columns */}
        <div className={styles.topRow}>
          {/* Column 1: Full Name */}
          <div>
            <label htmlFor="fullName" className={styles.label}>
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Jane Doe"
              onChange={() => handleInputChange("fullName")}
              className={`${styles.input} ${activeErrors.fullName ? styles.inputError : ""}`}
            />
            {activeErrors.fullName && (
              <span className={styles.errorText}>{activeErrors.fullName}</span>
            )}
          </div>

          {/* Column 2: Email Address */}
          <div>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="jane@example.com"
              className={`${styles.input} ${activeErrors.email ? styles.inputError : ""}`}
            />
            {activeErrors.email && (
              <span className={styles.errorText}>{activeErrors.email}</span>
            )}
          </div>

          <div>
            <label htmlFor="phone" className={styles.label}>
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="jane@example.com"
              className={`${styles.input} ${activeErrors.phone ? styles.inputError : ""}`}
            />
            {activeErrors.phone && (
              <span className={styles.errorText}>{activeErrors.phone}</span>
            )}
          </div>
        </div>

        {state.message && !state.success && (
          <div className={styles.serverError}>{state.message}</div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isPending}
            className={`${styles.submitBtn} ${isPending ? styles.submitBtnDisabled : ""}`}
          >
            {isPending ? "Sending..." : "Claim Your Coupon"}
          </button>
        </div>
        {/* <input type="hidden" name="cloudflareToken" value={captchaToken} />
    <Turnstile 
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''} 
        onSuccess={(token) => setCaptchaToken(token)} 
      /> */}
      </form>
    </div>
  );
}
