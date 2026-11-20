// // app/contact/page.tsx
 'use client';


import styles from './contactus.module.css';
import { useActionState, useState } from 'react';
import { contactAction, type ActionResponse } from '../../app/Actions/contactAction';
import { contactSchema, ContactFormData } from './../../lib/validations/contactus.schema';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';

type FieldName = keyof ContactFormData;

const initialState: ActionResponse = {
  success: false,
};

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(contactAction, initialState);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const [captchaToken, setCaptchaToken] = useState('');

  function handleClientSubmit(e: React.FormEvent<HTMLFormElement>) {
     if (!captchaToken) {
      alert('Please complete the security check!');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const rawData = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    // Client-side pre-check with Zod
    const validation = contactSchema.safeParse(rawData);

    if (!validation.success) {
      e.preventDefault(); // Stop network request
      const errors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0] as string;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      }
      setClientErrors(errors);
    } else {
      setClientErrors({});
    }
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
          onChange={() => handleInputChange('fullName')}
          className={`${styles.input} ${activeErrors.fullName ? styles.inputError : ''}`}
        />
        {activeErrors.fullName && (
          <span className={styles.errorText}>
            {activeErrors.fullName}
          </span>
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
          className={`${styles.input} ${activeErrors.email ? styles.inputError : ''}`}
        />
        {activeErrors.email && (
          <span className={styles.errorText}>
            {activeErrors.email}
          </span>
        )}
      </div>

      {/* Column 3: Subject */}
      <div>
        <label htmlFor="subject" className={styles.label}>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="Inquiry about services"
          className={`${styles.input} ${activeErrors.subject ? styles.inputError : ''}`}
        />
        {activeErrors.subject && (
          <span className={styles.errorText}>
            {activeErrors.subject}
          </span>
        )}
      </div>
    </div>

    {/* Full width: Message */}
    <div>
      <label htmlFor="message" className={styles.label}>
        Message
      </label>
      <textarea
        id="message"
        name="message"
        rows={6}
        placeholder="Write your message here..."
        className={`${styles.textarea} ${activeErrors.message ? styles.inputError : ''}`}
      />
      {activeErrors.message && (
        <span className={styles.errorText}>
          {activeErrors.message}
        </span>
      )}
    </div>

    {/* Top-level server error banner if sending failed */}
    {state.message && !state.success && (
      <div className={styles.serverError}>{state.message}</div>
    )}

    {/* Submit Button */}
    <div>
      <button
        type="submit"
        disabled={isPending}
        className={`${styles.submitBtn} ${isPending ? styles.submitBtnDisabled : ''}`}
      >
        {isPending ? 'Sending...' : 'Send Message'}
      </button>
    </div>
      <input type="hidden" name="cloudflareToken" value={captchaToken} />
    <Turnstile 
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''} 
        onSuccess={(token) => setCaptchaToken(token)} 
      />
  </form>

  {/* Right-hand side */}
  <div className={styles.rightArea}>
    <div className={styles.contactDetails}>
      <p><Phone size={18} className={styles.icon} /> <a href="tel:+15551234567" >+1 (555) 123-4567</a></p>
      <p><Mail size={18} className={styles.icon} /> <a href="mailto:info@example.com">info@example.com</a></p>
      <p><MapPin size={18} className={styles.icon} /> <a href="https://maps.google.com/?q=123+Main+Street,+City,+ST+12345" target="_blank" rel="noopener noreferrer">
        123 Main Street, Suite 100, City, ST 12345
      </a></p>
    </div>

    <iframe
      title="Google Map"
      className={styles.mapFrame}
      src="https://maps.google.com/maps?q=123%20Main%20Street%2C%20City%2C%20ST&t=&z=14&ie=UTF8&iwloc=&output=embed"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
</div>
  )
}