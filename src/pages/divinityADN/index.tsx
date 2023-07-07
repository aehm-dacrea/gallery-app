import type { GetStaticPropsResult, InferGetStaticPropsType } from "next";
import { useState, useRef, type MouseEvent, useEffect } from 'react';
import Image from 'next/image';
import { getBigPainting } from "@/utils/contentful";
import styles from './DivinityADN.module.css';

export default function Room({ bigPainting }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [mouseClickPosition, setMouseClickPosition] = useState<{ x: number; y: number; }>({ x: 0, y: 0});
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onImageClick = (event: MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    setMouseClickPosition(() => ({ x, y }));
  }

  useEffect(() => {
    containerRef.current?.style.setProperty('--clip-path-X', `${mouseClickPosition.x}px`);
    containerRef.current?.style.setProperty('--clip-path-Y', `${mouseClickPosition.y}px`);

  }, [mouseClickPosition]);

  return <>
    <div ref={containerRef} className={styles.container} onClick={onImageClick}>
      <Image className={styles.rearImage} width={2560} height={612.85} src={bigPainting.url} alt="Divinity's ADN" />
      <div className={styles.backdrop} />
      <Image className={styles.bigImage} width={2560} height={612.85} src={bigPainting.url} alt="Divinity's ADN" />
    </div>
  </>;
}

export async function getStaticProps(): Promise<GetStaticPropsResult<{ bigPainting: { url: string } }>> {
  const bigPainting = await getBigPainting();

  console.log('bigPainting', bigPainting);

  return {
    props: { bigPainting },
  };
}
