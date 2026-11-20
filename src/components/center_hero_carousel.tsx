'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper default styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './center_hero_carousel.module.css';

interface SlideItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  price: string;
}

const images: SlideItem[] = [
  { id: 1, src: '/images/1.png', alt: 'Style 1', title: 'Style 1', price: '$100 | $200' },
  { id: 2, src: '/images/2.png', alt: 'Style 2', title: 'Style 2', price: '$150 | $300' },
  { id: 3, src: '/images/3.png', alt: 'Style 3', title: 'Style 3', price: '$200 | $400' },
  { id: 4, src: '/images/4.png', alt: 'Style 4', title: 'Style 4', price: '$250 | $500' },
  { id: 5, src: '/images/5.png', alt: 'Style 5', title: 'Style 5', price: '$300 | $600' },
];

export default function CenterHeroCarousel() {
  return (
    <div className={styles.carouselContainer}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1.5}
        centeredSlides={true}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 3, // Show 3 slides on tablet/desktop
            spaceBetween: 40,
          },
        }}
        className={styles.swiperWrapper}
      >
        {images.map((item) => (
          <SwiperSlide key={item.id} className={styles.slide}>
            <div className={styles.imageCard}>
              akber
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 70vw, 33vw"
                style={{ objectFit: 'cover' }}
              />

            </div>
    <div className={styles.imageInfo}>
      <span className={styles.imageTitle}>{item.title}</span>
      <span className={styles.imagePrice}>{item.price}</span>
    </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}