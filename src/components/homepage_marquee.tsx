import styles from "./homepage_marquee.module.css";
import { galleryItems } from "../static_data/homepage_marquee";
import { Button } from "./btn_booking";
import { ArrowRight, CalendarHeart } from "lucide-react";
import Image from "next/image";


export default function MarqueeBanner() {
  const duplicatedImages = [...galleryItems, ...galleryItems];
  const dayNumber = new Date().getDay();
  
  return (
    <div className={styles.marqueeContainer}>

      {/* Images scroll in the background */}
      <div className={styles.marqueeViewport}>
        <div className={styles.marqueeTrack}>
          {duplicatedImages.map((image, idx) => (
            <div
              key={idx}
              className={styles.marqueeCard}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="280px"
                style={{ objectFit: "cover" }}
              />

              <div className={styles.imageOverlay} />
            </div>
          ))}
        </div>
      </div>

      {/* Static content stays above the scrolling images */}
      <div className={styles.marqueeContent}>
        <h1>{galleryItems[dayNumber].title}</h1>
        <h2>{galleryItems[dayNumber].subTitle}</h2>
        <p>
          {galleryItems[dayNumber].text}
        </p>

        <div className={styles.buttonGroup} >
          <Button
            label="Book Now"
            url="http://akberalikhan.com"
            variant="outlinePink"
            icon={CalendarHeart}
            iconPosition="right"
            iconSize={30}
            iconColor="pink"
            fillColor=""
          />

          <Button
            label="Services"
            url="/services"
            variant="outlineBlack"
            icon={ArrowRight}
            iconPosition="right"
            iconSize={20}
            iconColor="#2563eb"
              fillColor=""
          />
        </div>
      </div>

    </div>
  );
}
