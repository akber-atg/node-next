"use client";

import { useEffect, useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import { MasonryPhotoAlbum } from "react-photo-album";
import { ColumnsPhotoAlbum } from "react-photo-album";
import type { Photo } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "react-photo-album/masonry.css";
import "react-photo-album/columns.css";
import "react-photo-album/rows.css";
import "yet-another-react-lightbox/styles.css";
import Download from "yet-another-react-lightbox/plugins/download";
import Share from "yet-another-react-lightbox/plugins/share";
// css modules
import styles from "./photogallery.module.css";

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    async function loadImages() {
      const response = await fetch("/api/images");

      if (!response.ok) {
        throw new Error("Failed to load images");
      }

      const images: Photo[] = await response.json();
      setPhotos(images);
    }

    loadImages().catch(console.error);
  }, []);

  return (
    <>
      <MasonryPhotoAlbum
        photos={photos}
        spacing={10}
        onClick={({ index }) => setIndex(index)}
        componentsProps={{
          image: {
            className: styles.galleryImage,
          },
        }}
      />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
          plugins={[Download, Share]}
      />
    </>
  );
}
