// this comonent take one picture, alt text, html contents, and a title
// the image goes on the left, and the html content goes on the right

import React from "react";
import Image from "next/image";
import styles from "./homepage_card.module.css";

// Direct import of local JSON
import cardData from "@/static_data/homepage_cards.json";

import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

interface CardData {
  id: string;
  image: string;
  alt?: string;
  htmlContent: string;
  title: string;
}

interface CardProps {
  cardId: string;
}

export default function Card({ cardId }: CardProps) {
  const data = cardData.filter((card) => card.id === cardId) as CardData[];
  console.log("Card data for id:", cardId, data);
  return (
    <>
      {data?.map((item, index) => (
        <div className={styles.card} key={index}>
          <div className={styles.cardHeader}>
            <h2>{item.title}</h2>
          </div>
          <div className={styles.cardBody}>
            {item.image ? (
              <>
                <div className={styles.leftImage}>
                  <Image
                    src={item.image}
                    alt={item.alt || "Card image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className={styles.cardImage}
                    priority
                  />
                </div>
                <div
                  className={styles.rightContent}
                  dangerouslySetInnerHTML={{ __html: item.htmlContent }}
                />
              </>
            ) : (
              <div>
                <div dangerouslySetInnerHTML={{ __html: item.htmlContent }} />
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
