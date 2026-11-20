import type { Metadata } from 'next';

import "../gloabals.css"

export const metadata: Metadata = {
  title: "Privacy Policy",
   description:
    "Explore haircuts, hair coloring, waxing, facials, and threading at Mahlaha Salon in the Des Moines metro area.",

};

export default function Privacy() {
  return (
    <>
    <div className="globalContainer">
      <h1>Our Privacy Policy</h1>
      <p>We collect no personal information (PII) about you when you visit our site unless you choose to provide this information to us. Submitting personally identifiable information through our website is voluntary, but by doing so, you are giving your permission to use the information for the stated purpose. Not providing certain information may result in the inability to provide you with a service you desire.</p>
      <h3>If You Send Us E-mail?</h3>
      <p>You may choose to provide us with personal information when sending us an email with a comment or question. We may use the information provided to improve our service to you or to respond to your request.</p>
      <h3>Punctionality</h3>
      <p>Please contact a salon coordinator if it appears that you are going to be late to an appointment. If you are expecting to be more than ten minutes late we cannot guarantee completion of the services booked, but as always, we’ll make every effort to do so</p>
      <h3>Personal Items</h3>
      <p>Mahlaha Salon is not responsible for personal items that have been damaged during services. So, please be extra careful with your personal items.</p>
      <h3>Payment Methods</h3>
      <p>Cash, Visa, MasterCard, Discover, and Mahlaha Salon gift certificate are acceptable tenders for all services and products.</p>
      <h3>Cancellation</h3>
      <p>To cancel or reschedule your appointment please call  515-304-0770. If we are closed please Contact Us We want to express how important it is that you never no-show an appointment. If you are no longer able to make your appointment we ask that you give us as much notice (min 24 hrs.) as possible to ensure our ability to re-book your appointment slot</p>
      <h3>Kids Safety</h3>
      <p>Our salon contains sharp tools (scissors), chemicals, and hot styling equipment, making it unsafe for unattended children. Parents/gurdian is responsible for the safety of children. We encourage parents to closely monitor the safety of their children. In case of acccident Mahlaha Esthetics LLC will not be responsible for any form of liability</p>
      </div>
    </>
  );
}
