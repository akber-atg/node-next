export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  alt: string;
}

export const galleryItems: GalleryItem[] = [
  { id: '1', src: '/images/1.png', title: 'Mountain View', alt: 'Scenic mountain landscape' },
  { id: '2', src: '/images/2.png', title: 'Ocean Waves', alt: 'Blue waves crashing on the shore' },
  { id: '3', src: '/images/3.png', title: 'City Skyline', alt: 'Night cityscape with bright lights' },
  { id: '4', src: '/images/4.png', title: 'Forest Trail', alt: 'Green forest walking trail' },
  { id: '5', src: '/images/5.png', title: 'Desert Dunes', alt: 'Golden sand dunes at sunset' },
  { id: '6', src: '/images/6.png', title: 'Desert Dunes', alt: 'Golden sand dunes at sunset' }
];