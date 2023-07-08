import type { Dispatch, SetStateAction } from "react";
import type { Painting } from "@/utils/contentful";
import Image from "next/image";
import styles from "./PaintingTile.module.css";
import LogoSquare from "@/assets/logo-square.jpeg";

interface PaintingTileProps {
  imageUrl: string;
  title: string;
  paintingId: number;
  onClick?: () => void;
}

export const PaintingTile = ({
  imageUrl,
  title,
  paintingId,
  onClick,
}: PaintingTileProps) => {
  return (
    <div
      className={styles.paintingTile}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <Image
        className={styles.image}
        src={imageUrl || LogoSquare}
        alt={title}
        width={80}
        height={80}
      />
      <h3 className={styles.title}>
        {paintingId}. {title}
      </h3>
    </div>
  );
};
