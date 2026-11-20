import { getImageProps } from "next/image";
import { ArrowRight } from "lucide-react";

// csss modules
import styles from "@/components/hero_banner.module.css";

// componets
import { Button } from "@/components/btn_booking";

// static data 
import dailyBannerData from "@/static_data/daily_banner.json";

interface DailyBannerConfig {
  dayOfWeek: string;
  alt: string;
  text: {
    title: string;
    subtitle: string;
  };
  images: {
    desktop: {
      src: string;
      width: number;
      height: number;
    };
    mobile: {
      src: string;
      width: number;
      height: number;
    };
  };
}

interface HeroBannerProps {
  desktopTitle?: string;
  desktopSubtitle?: string;
  mobileTitle?: string;
  mobileSubtitle?: string;
}

const DEFAULT_BANNER: DailyBannerConfig = {
  dayOfWeek: "monday",
  alt: "Featured Tech Gear",
  text: {
    title: "Innovate Your Setup",
    subtitle: "High-performance tech essentials",
  },
  images: {
    desktop: {
      src: "/images/banners/friday-desktop.jpg",
      width: 1920,
      height: 400,
    },
    mobile: {
      src: "/images/banners/friday-mobile.jpg",
      width: 800,
      height: 400,
    },
  },
};

interface HeroBannerProps {
  dayOfWeek?: string; // e.g., "saturday", "sunday"
}

export default function HeroBanner({ dayOfWeek }: HeroBannerProps) {

  const banners = dailyBannerData as DailyBannerConfig[];
  const currentDayOfWeek =
    dayOfWeek ??
    new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

  const dailyBanner =
    banners.find((b) => b.dayOfWeek === currentDayOfWeek) ??
    banners[0] ??
    DEFAULT_BANNER;
  const common = {
    alt: dailyBanner.alt,
    priority: true,
  };

  // 1. Mobile crop
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...common,
    ...dailyBanner.images.mobile,
  });

  // 2. Desktop crop
  const {
    props: { srcSet: desktopSrcSet, ...rest },
  } = getImageProps({
    ...common,
    ...dailyBanner.images.desktop,
  });

  return (
    <div className={styles.bannerContainer}>
      {/* <picture>
        <source media="(min-width: 600px)" srcSet={desktopSrcSet} />
        <source media="(max-width: 599px)" srcSet={mobileSrcSet} />
        <img {...rest} className={styles.bannerImage} 
       />
      </picture> */}

      <div className={styles.overlay}>
        <div className={styles.contents}>
          <h1 className={styles.title}>{dailyBanner.text.title}</h1>
          <p className={styles.subtitle}>{dailyBanner.text.subtitle}</p>
          <div className={styles.buttonWrapper}>
          <Button
            label="Do something"
            url="http://akberalikhan.com"
            variant="outline"
            icon={ArrowRight}
            iconPosition="right"
            fillColor="pink"
          />
        </div>
        </div>
        
      </div>
    </div>
  );
}
