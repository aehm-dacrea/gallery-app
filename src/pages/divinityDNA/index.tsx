import type { GetStaticPropsResult, InferGetStaticPropsType } from "next";
import { useState, useRef, type MouseEvent, useEffect } from 'react';
import Image from 'next/image';
import { type BigPaintingFragment, getBigPainting, getBigPaintingFragments } from "@/utils/contentful";
import { PaintingTile } from "@/components/paintingTile";
import { NavigationBar } from "@/components/navigationBar";
import styles from './DivinityDNA.module.css';

export default function Room({ bigPainting, bigPaintingFragments }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [mouseClickPosition, setMouseClickPosition] = useState<{ x: number; y: number; }>({ x: 0, y: 0});
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onImageClick = () => {
    containerRef.current?.style.removeProperty('--filter-brightness');
  }

  const setPaddingTop = () => {
    const height = window.innerWidth * 612.85 / 2560 + 65.5;
    document.documentElement.style.setProperty('--body-padding-top', `${height}px`);
  }

  useEffect(() => {
    setPaddingTop();

    window.addEventListener('resize', setPaddingTop);

    return () => document.documentElement.style.setProperty('--body-padding-top', `0px`);
  }, []);

  useEffect(() => {
    containerRef.current?.style.setProperty('--clip-path-X', `${mouseClickPosition.x}%`);
    containerRef.current?.style.setProperty('--clip-path-Y', `${mouseClickPosition.y}%`);
    if (mouseClickPosition.x !== 0 && mouseClickPosition.y !== 0) {
      containerRef.current?.style.setProperty('--filter-brightness', 'brightness(0.3)');
    }
  }, [mouseClickPosition]);

  return <>
    <NavigationBar isSticky={true} />
    <div ref={containerRef} className={styles.container} onClick={onImageClick}>
      <Image className={styles.rearImage} width={2560} height={612.85} src={bigPainting.url} alt="Divinity's ADN" priority />
      <div className={styles.backdrop} />
      <Image className={styles.bigImage} width={2560} height={612.85} src={bigPainting.url} alt="Divinity's ADN" priority />
    </div>
    <div className={styles.tileContainer}>
      {bigPaintingFragments.map((fragment, i) => (
        <PaintingTile
          imageUrl={fragment.image.url}
          paintingId={fragment.paintingId}
          title={fragment.title}
          key={i}
          onClick={() => setMouseClickPosition({ x: fragment.coordinateX, y: fragment.coordinateY })}
        />
      ))}
    </div>
  </>;
}

export async function getStaticProps(): Promise<GetStaticPropsResult<{ bigPainting: { url: string }, bigPaintingFragments: BigPaintingFragment[] }>> {
  const bigPainting = await getBigPainting();
  const bigPaintingFragments = await getBigPaintingFragments();

  return {
    props: { bigPainting, bigPaintingFragments },
  };
}
