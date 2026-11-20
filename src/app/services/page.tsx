"use client";

// import styles from "./services.module.css";
import data from "../../static_data/services.json";
import Image from "next/image";
import { ServiceCard, ServiceItem } from "./../../components/service_card";
import { CalendarHeart } from "lucide-react";
import { Button } from "../../components/btn_booking";

export default function Services() {
  const imageUrl = process.env.NEXT_PUBLIC_ICON_IMAGE ?? "";

  return (
    <>
      <h1 className="px-4">Services &</h1> {/* Keeps header aligned with card */}
      <div className="services-container">
        {data.servicesData.map((service) => (
          <div   key={service.serviceId}  style={{ display: 'flex', flexDirection: 'column', height: '80%' }}>
            <ServiceCard
            
              service={service}
              imagePath={imageUrl}
            />

         </div>
        ))}
      </div>
    </>
  );
}
