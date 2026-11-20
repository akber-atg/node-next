// src/app/gallery/page.tsx
// Server Component (no 'use client')


import PhotoGallery from '../../components/photogallery';
export default async function GalleryPage() {



  return (
    <main >
      <header style={{ marginBottom: '10px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>10 Image Gallery</h1>
        <p style={{ color: '#666' }}>Server-rendered shell with optimized client loading</p>
      </header>

      {/* Hand the 10 items to the interactive client component */}
      <PhotoGallery />
    </main>
  );
}