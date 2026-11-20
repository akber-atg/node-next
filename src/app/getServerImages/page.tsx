"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}


export default function GetServerImages() {

  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/images");
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
       <h1>Image Gallery</h1>

      {images.map((image, index) => (
     <div key={index} style={{ border: "solid 1px red" }}>
        <Image
          src={image.src}
          alt={image.alt}
          width={300}
          height={200}
          style={{ objectFit: "cover" }}
        />
      </div>
      ))}
      
    </>
  );
}
