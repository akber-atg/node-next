// src/app/gallery/page.tsx
// Server Component (no 'use client')

import { galleryItems } from  '../../static_data/homepage_images';
import ImageGalleryClient from './ImageGalleryClient';

export default async function GalleryPage() {
  // In a real database scenario: const images = await db.images.findMany();
  // Here we load the 10 static entries:
  const images = galleryItems;

  return (
    <main >
      <header style={{ marginBottom: '10px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>10 Image Gallery</h1>
        <p style={{ color: '#666' }}>Server-rendered shell with optimized client loading</p>
      </header>

      {/* Hand the 10 items to the interactive client component */}
      <ImageGalleryClient items={images} />
    </main>
  );
}