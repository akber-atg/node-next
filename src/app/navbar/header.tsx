// src/components/Navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";
import DirectContact from "../../components/direct_contact";

interface NavItem {
  label: string;
  href: string;
}

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contactus" },
  { label: "Booking ZOD", href: "/booking" },
  { label: "Services", href: "/services" },
  { label: "Server Images", href: "/getServerImages" },
  { label: "Photo Light Gallery", href: "/photogallery" },
  { label: "view coupons", href: "/coupon/list" },
  { label: "Add coupons", href: "/coupon" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <DirectContact />
      <div className={styles.container}>
        {/* Brand */}
        <Link href="/" className={styles.brand} onClick={handleLinkClick}>
          MyApp
        </Link>

        {/* Desktop List (Hidden on mobile via CSS) */}
        <ul className={styles.desktopList}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger Button (Hidden on desktop via CSS) */}
        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          
          <ul className={styles.mobileList}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} className={styles.mobileItem}>
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
