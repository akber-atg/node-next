// src/components/Footer.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";
import {Phone, Mail} from "lucide-react"
interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const brandLogosColumn = {
  title: "Our Partners & Technologies",
  isGrid: true, // A flag to tell your JSX to render a grid instead of standard text links
  images: [
    { label: "AWS", src: "/images/footer-images/lady-hair.png" },
    { label: "Next.js", src: "/images/footer-images/lady-hair.png" },
    { label: "React", src: "/images/footer-images/lady-hair.png" },
    { label: "Node.js", src: "/images/footer-images/lady-hair.png" },
    { label: "Cloudflare", src: "/images/footer-images/lady-hair.png" },
    { label: "Docker", src: "/images/footer-images/lady-hair.png" },
    { label: "GitHub", src: "/images/footer-images/lady-hair.png" },
    { label: "TypeScript", src: "/images/footer-images/lady-hair.png" },
  ],
};

const serviceColumns: FooterColumn[] = [
  {
    title: "Cloud Services",
    links: [
      { label: "AWS Architecture", href: "/services/aws" },
      { label: "Cloud Migration", href: "/services/migration" },
      { label: "DevOps & CI/CD", href: "/services/devops" },
      { label: "Serverless Solutions", href: "/services/serverless" },
    ],
  },
  {
    title: "Web Engineering",
    links: [
      { label: "Next.js & React Apps", href: "/services/nextjs" },
      { label: "Headless CMS", href: "/services/cms" },
      { label: "API Development", href: "/services/api" },
      { label: "Performance Audit", href: "/services/performance" },
    ],
  },
  {
    title: "Design & Creative",
    links: [
      { label: "UI/UX Design", href: "/services/ui-ux" },
      { label: "Design Systems", href: "/services/design-systems" },
      { label: "Prototyping", href: "/services/prototyping" },
      { label: "Brand Identity", href: "/services/branding" },
    ],
  },
  {
    title: "Support & Security",
    links: [
      { label: "Managed Maintenance", href: "/services/maintenance" },
      { label: "Security & Compliance", href: "/services/security" },
      { label: "Data Recovery", href: "/services/recovery" },
      { label: "24/7 SLA Support", href: "/services/support" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.logoSection}>
        <div className={styles.mainLogo}>
          <h3 className={styles.brandTitle}>AkberAL</h3>
        </div>

        <div className={styles.logoGrid}>
          {brandLogosColumn.images.map((item, index) => (
            <div key={index} className={styles.logoItem}>
              <a href={item.label || "#"} className={styles.logoImage}>
                {/* <Image
                  src={item.src}
                  alt={item.label}
                  width={48}
                  height={48}
                  className="object-contain w-10 h-10 sm:w-12 sm:h-12"
                /> */}
              </a>

              <a href={item.label || "#"} className={styles.logoLabel}>
                {item.label}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.leftColumn}>
            <address className={styles.address}>
              <strong>Address</strong>
              <br />
              700 SE Prairie Park Ln, 
               <br />
              Suite 400
              <br />
              Waukee, IA 50263
            </address>

            <p className={styles.contactItem}>
              <Mail size={18} />{" "}
              <a href="mailto:info@myapp.com" className={styles.contactLink}>
                info@myapp.com
              </a>
            </p>
            <p className={styles.contactItem}>
              <Phone size={18} />{" "}
              <a href="tel:+15125550199" className={styles.contactLink}>
                +1 (512) 555-0199
              </a>
            </p>
          </div>

          <div className={`${styles.rightColumn} ${styles.address}`}>
           <strong>Hours</strong>
            <br />
            <span>Tue – Sun: 9 AM – 5 PM</span>
            <br />
            <span>Mon: Closed</span>
          </div>
        </div>
        {/* Bottom Bar: Copyright & Legal */}
        <div className={styles.bottomBar}>
          <p className={styles.copy}>
            &copy; {currentYear} Mahlaha Salon. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/privacy" className={styles.legalLink}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={styles.legalLink}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
