import { useEffect, useState } from "react";
import { Phone, MapPin } from "lucide-react";
import styles from "./direct_contact.module.css";

export default function DirectContact() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.topBar}>
      <div key={messageIndex} className={styles.message}>
        {messageIndex === 0 ? (
          <>
            <a href="tel:+15551234567" className={styles.item}>
              <Phone size={12} className={styles.icon} />
              <span>+1 (555) 123-4567</span>
            </a>

            <span className={styles.separator}>•</span>

            <a
              href="https://maps.google.com/?q=123+Main+Street,+City,+ST+12345"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.item}
            >
              <MapPin size={12} className={styles.icon} />
              <span>123 Main Street, Suite 100, City, ST 12345</span>
            </a>
          </>
        ) : (
          <span className={styles.promo}>Check our Tuesday Special !!</span>
        )}
      </div>
    </div>
  );
}
