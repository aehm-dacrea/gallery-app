import type { Dispatch, SetStateAction } from 'react';
import type { Painting } from '@/utils/contentful';
import Image from 'next/image';
import styles from './PaintingTile.module.css';
import LogoSquare from '@/assets/logo-square.jpeg';

interface PaintingTileProps {
  painting: Painting; 
  setCurrentAudio: Dispatch<SetStateAction<Painting>>
}

export const PaintingTile = ({
  painting,
  setCurrentAudio,
}: PaintingTileProps) => {
  const imageUrl =
    painting.paintingImageCollection?.items[0]?.url || LogoSquare;

  return (
    <div
      className={styles.paintingTile}
      onClick={() => setCurrentAudio(() => painting)}
    >
      <Image
        className={styles.image}
        src={imageUrl}
        alt={painting.title}
        width={80}
        height={80}
      />
      <h3 className={styles.title}>{painting.paintingId}. {painting.title}</h3>
    </div>
  );
};
