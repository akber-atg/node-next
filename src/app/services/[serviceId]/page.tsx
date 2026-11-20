// // app/contact/page.tsx
"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { getImageProps } from "next/image";
import Card from "@/components/homepage_card";
import data from "@/static_data/services.json";
import { ServiceCard } from "@/components/service_card";

import styles from "@/app/services/services.module.css";

export default function ServicePage() {
  const params = useParams<{ serviceId: string }>();

  const service = data.servicesData.find(
    (item) => item.serviceId === params.serviceId,
  );

  if (!service) {
    return <h1>Service not found</h1>;
  }

  const common = {
    alt: "Mahlaha Salon",
    sizes: "100vw",
  };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: "/images/hair/landscape.png",
    width: 1920,
    height: 800,
    quality: 80,
  });

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...common,
    src: "/images/hair/portrait1.png",
    width: 400,
    height: 600,
    quality: 80,
  });

  const imageUrl = process.env.NEXT_PUBLIC_ICON_IMAGE ?? "";

  return (
    <>
      <h2>{service.mainServiceName}</h2>
      <p>{service.mainServiceDescription}</p>
      <picture>
        {/* Display on small screens */}
        <source
          media="(max-width: 767px)"
          srcSet={mobileSrcSet}
          sizes="100vw"
        />

        {/* Default image for larger screens */}
        <img
          src="/images/hair/landscape.png"
          srcSet={desktopSrcSet}
          sizes="100vw"
          alt="Mahlaha Salon"
          className="hero-image"
        />
      </picture>

      {/* card with image */}
      <Card cardId={service.serviceId}></Card>
      {/* card without image */}
      {/* <Card cardId={3}></Card> */}
      <div className={styles.wrapper}>
        <ServiceCard service={service} imagePath={imageUrl} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "11px",
            alignItems: "center",
            flexDirection: "column",
          }}
        ></div>
      </div>
    </>
  );
}
