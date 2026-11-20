import React, { useState } from "react";
import Image from "next/image";
import "./service_card.css";
import { CalendarHeart } from "lucide-react";
import { Button } from "./btn_booking";

export interface CategoryItem {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  bookingUrl: string;
}

export interface ServiceItem {
  serviceId: string;
  mainServiceName: string;
  mainServiceImage: string;
  mainServiceDescription: string;
  mainBookingUrl:string;
  categories: CategoryItem[];
}

interface ServiceCardProps {
  service: ServiceItem;
  imagePath: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  imagePath,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    service.categories[0]?.id || "",
  );

  const selectedCategory =
    service.categories.find((cat) => cat.id === selectedCategoryId) ||
    service.categories[0];

  return (
    <div className="service-card">
      {/* 1. Top Header with Small Thumbnail */}
      <div className="card-header-compact">
        <div className="image-thumb-wrapper">
          <Image
            src={`${imagePath}${service.mainServiceImage}`}
            alt={service.mainServiceName}
            width={52}
            height={52}
            priority
            className="image-thumb"
          />
        </div>
        <div className="header-text-content">
          <h2 className="header-title">{service.mainServiceName}</h2>
          <p className="header-subtitle">{service.mainServiceDescription}</p>
        </div>
      </div>

      {/* 2. Card Body / Categories List */}
      <div className="card-body">
        <span className="section-label">Select an option for details</span>
        <div className="categories-list">
          {service.categories.map((cat) => {
            const isSelected = cat.id === selectedCategoryId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`category-item-btn ${isSelected ? "selected" : ""}`}
              >
                <span className="category-name">{cat.name}</span>
                <span className="category-price">${cat.price.toFixed(0)}</span>
              </button>
            );
          })}
        </div>

        {/* 3. Detail of Selected Category */}
        {selectedCategory && (
          <div className="category-details">
            <div className="badges-group"></div>
            <h3 className="detail-name">
              {selectedCategory.name} (Duration: {selectedCategory.duration})
            </h3>
            <p className="detail-description">{selectedCategory.description}</p>
            <div className="card-footer">
              <Button
                label="Book Now"
                url={`/services/${service.serviceId}`}
                variant="outlineBlack"
                icon={CalendarHeart}
                iconPosition="right"
                iconSize={30}
                iconColor="pink"
                fillColor=""
                textColor="black"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
