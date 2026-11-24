"use client";

import { useState, useEffect, useRef } from "react";
import { CalendarHeart } from "lucide-react";

// css modules
import styles from "@/app/homepage.module.css";
//hooks
import {
  useLandingPageContents,
  useGoogleReviews,
} from "@/app/hooks/useLandingPageContents";
//components
import { Button } from "@/components/btn_booking";
import GoogleReviews from "@/components/google_reviews";
import OfferDialog from "@/components/dialog_general";
import MarqueeBanner from "@/components/homepage_marquee";
import HeroBanner from "@/components/hero_banner";
import Card from "@/components/homepage_card";
import CenterHeroCarousel from "@/components/center_hero_carousel";
import HeroSection from "@/components/hero_section_image";

// static data
import reviews from "@/static_data/ratings.json";
import Chat from "@/components/chatbot";

interface PageItem {
  id: number;
  title: string;
  contents: string;
  image_url1?: string | null;
  image_url2?: string | null;
  is_active: boolean;
  page_id: number;
  ord: number;
}

enum ServiceType {
  Hair = 1,
  Facial = 2,
  Waxing = 3,
  Threading = 4,
  Microblading = 5,
}

export default function Home() {
  const hasLoaded = useRef(false);

  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const { data, isLoading, error } = useLandingPageContents();
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useGoogleReviews();

  const pageData: PageItem[] = data?.data ?? [];

  const dialogItems: PageItem | null =
    pageData.find((item: PageItem) => item.id === ServiceType.Hair) || null;
  const videoRef = useRef<HTMLVideoElement>(null);

  // const getGoogleLocation = async () => {
  //   try {
  //     const response = await fetch("/api/googlereviews");

  //     if (!response.ok) {
  //       throw new Error("Failed to retrieve Google location");
  //     }

  //     const data = await response.json();

  //     console.log("Google Location:", data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.2;
    }
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    //getGoogleLocation();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error loading content.</div>;

  if (reviewsLoading) {
    console.log("Loading Google reviews");
  }

  if (reviewsError) {
    console.log("Error:", reviewsError);
  }

  if (reviewsData) {
    console.log("Google reviews:", reviewsData.reviews);
  }

  return (
    <>
      <h1>Welcome</h1>
      <HeroSection
        image="/images/landingpage/mobile-full-screen.png"
        title="Welcome to My APP"
        subtitle="Experience the best in software services"
        description="Discover our range of premium services designed to enhance your natural requierements."
      />

      {dialogItems ? (
        <OfferDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title={dialogItems.title}
          description={dialogItems.contents}
        />
      ) : null}

      <GoogleReviews data={reviews} />

      <div className={styles.globalContainer}>
        <div className={styles.videoContainer}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className={styles.landingVideo}
          >
            <source src="/images/introvideo.mp4" type="video/mp4" />
            Your browser does not support video playback.
          </video>
          <div className={styles.overlay}>
            <div className={styles.buttonWrapper}>
              <Button
                label="whatever"
                url="http://akberalikhan.com"
                variant="outlinePink"
                icon={CalendarHeart}
                iconPosition="right"
                iconSize={30}
                iconColor="pink"
                fillColor=""
              />
            </div>
          </div>
        </div>

        <HeroBanner
          dayOfWeek={new Date()
            .toLocaleDateString("en-US", { weekday: "long" })
            .toLowerCase()}
        />

        {/* {apiData && (
          <pre
            style={{
              marginTop: "1rem",
              background: "#f4f4f4",
              padding: "1rem",
            }}
          >
            {apiData}
          </pre>
        )} */}
        <MarqueeBanner />

        <div className={styles.cardContainer} style={{ marginTop: "2rem" }}>
          <Card cardId={"facials"} />

          <div className={styles.buttonWrapper1}>
            <Button
              label="whatever"
              url="http://akberalikhan.com"
              variant="outlinePink"
              icon={CalendarHeart}
              iconPosition="right"
              iconSize={20}
              iconColor="pink"
              fillColor=""
              textColor="brown"
            />
          </div>
        </div>

        <CenterHeroCarousel />
        {/* <main>
      <Chat />
    </main> */}
      </div>
    </>
  );
}
