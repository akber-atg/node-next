// src/app/gallery/ImageGalleryClient.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GalleryItem } from  '../../static_data/homepage_images';

interface Props {
  items: GalleryItem[];
}

export default function ImageGalleryClient({ items }: Props) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <div>
      {/* Responsive Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
        }}
      >
        {items.map((item, index) => {
          // STRATEGY:
          // The first 2 images are visible above the fold -> priority={true}
          // The remaining 8 images are lazily loaded as the user scrolls -> loading="lazy"
          const isAboveFold = index < 2;

          return (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              style={{
                position: 'relative',
                aspectRatio: '4 / 3', // Reserves space to completely prevent Layout Shift (CLS)
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#e2e8f0',
                cursor: 'pointer',
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority={isAboveFold}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '8px 12px',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  color: '#fff',
                  fontSize: '0.9rem',
                }}
              >
                {item.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Lightbox preview */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '800px',
              height: '500px',
              backgroundColor: '#000',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              sizes="800px"
              style={{ objectFit: 'contain' }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                padding: '6px 12px',
                background: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}