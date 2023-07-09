import Image from "next/image";
import Link from "next/link";
import LogoSquare from "@/assets/logo-square.jpeg";
import { openSans } from '@/pages/_app';
import styles from "./BigTile.module.css";

interface BigTileProps {
  imageUrl?: string;
  title: string;
  link: string;
  onClick?: () => void;
}

export const BigTile = ({
  imageUrl,
  title,
  link,
  onClick,
}: BigTileProps) => {
  return (
    <Link href={link}>
      <div
        className={styles.bigTile}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
      > 
        {imageUrl ? <Image className={styles.image} src={imageUrl} alt={title} fill /> : null}
        <h3 className={`${styles.title}`}>
          {title}
        </h3>
      </div>
    </Link>
  );
};
