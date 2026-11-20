import Image from "next/image";
import styles from "./hero_section_image.module.css";

interface HeroSectionProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

export default function HeroSection({
  image,
  title,
  subtitle,
  description,
}: HeroSectionProps) {
  return (
    <section className={styles.hero}>
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.backgroundImage}
      />

      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <h3>{description}</h3>
      </div>
    </section>
  );
}