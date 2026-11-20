export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  subTitle: string;
  text: string; 
  alt: string;
}

export const galleryItems: GalleryItem[] = [
  { id: '0', src: '/images/1.png', title: 'Sunday', subTitle: 'this is subTitle', text: 'this is text', alt: 'Scenic mountain landscape' },
  { id: '1', src: '/images/2.png', title: 'Monday', subTitle: 'Ocean Waves', text: 'Ocean Waves', alt: 'Blue waves crashing on the shore' },
  { id: '2', src: '/images/3.png', title: 'Tuesday', subTitle: 'City Skyline', text: 'City Skyline', alt: 'Night cityscape with bright lights' },
  { id: '3', src: '/images/4.png', title: 'Wednesday', subTitle: 'Forest Trail', text: 'Forest Trail', alt: 'Green forest walking trail' },
  { id: '4', src: '/images/5.png', title: 'Thursday', subTitle: 'Desert Dunes', text: 'Desert Dunes', alt: 'Golden sand dunes at sunset' },
  { id: '6', src: '/images/6.png', title: 'Friday', subTitle: 'Desert Dunes', text: 'Desert Dunes', alt: 'Golden sand dunes at sunset' },
  { id: '7', src: '/images/6.png', title: 'Saturday', subTitle: 'We are close', text: 'We can serve you on demand', alt: 'Golden sand dunes at sunset' }
  
];