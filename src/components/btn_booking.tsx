import React from "react";
import { LucideIcon } from "lucide-react";
import styles from "./btn_booking.module.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "outlinePink"
  | "outlineWhite"
  | "outlineBlack"
  | "text"
  | "textPink"
  | "textWhite"
  | "textBlack";

interface ButtonProps {
  label: string;
  url?: string;
  target?: "_blank" | "_self";
  variant?: ButtonVariant;
  className?: string; // Accepts custom classes passed from the parent
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  iconSize?: number;
  iconColor?: string;
  fillColor:string;
  textColor?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  url,
  target = "_self",
  variant = "primary",
  className = "",
  icon: Icon,
  iconPosition = "left",
  iconSize = 18,
  iconColor,
  fillColor,
  textColor="white",
  onClick,
}) => {
  // Combine base CSS module, internal variant, and external parent class
  const combinedClasses =
    `${styles.base} ${styles[variant]} ${className} `.trim();

  const iconElement = Icon ? (
    <span className={styles.icon}>
      <Icon size={iconSize} color={iconColor} fill={fillColor?fillColor:"white"} />
    </span>
  ) : null;

  const content = (
    <>
      {Icon && iconPosition === "left" && iconElement}
      <span style={{ color: textColor }}>{label}</span>
      {Icon && iconPosition === "right" && iconElement}
    </>
  );

  // If a URL is provided, render an anchor tag
  if (url) {
    const isExternal = target === "_blank";
    return (
      <a
        href={url}
        className={combinedClasses}
        target={target}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  // Otherwise render a standard button
  return (
    <button type="button" className={combinedClasses} onClick={onClick} >
      {content}
    </button>
  );
};
