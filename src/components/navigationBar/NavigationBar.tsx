import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import { useEffect, useRef } from 'react';
import { PiHouse } from "react-icons/pi";
import LogoCentral from "@/assets/logo-central.svg";
import styles from "./NavigationBar.module.css";

type Locale = 'en-US' | 'ro-MD' | 'ru-MD';

export const NavigationBar = ({ isSticky = false }: { isSticky?: boolean; }) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const navigationBarRef = useRef<HTMLDivElement>(null);

  const localeMap = {
    'en-US': { nextLocale: 'ro-MD', localeText: 'En' },
    'ro-MD': { nextLocale: 'ru-MD', localeText: 'Ro' },
    'ru-MD': { nextLocale: 'en-US', localeText: 'Ru' },
  }
  
  const { nextLocale, localeText } = localeMap[router.locale as Locale];

  const setCookie = (locale: Locale) => {
    document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
  }

  useEffect(() => {
    const height = navigationBarRef.current?.getBoundingClientRect().height || 0;
    document.documentElement.style.setProperty('--nav-bar-height', `${height}px`);
  }, []);

  const updateLocale = () => {
    setCookie(nextLocale as Locale);
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  }

  return (
    <div ref={navigationBarRef} className={`${styles.navigationBar} ${isSticky ? styles.sticky : ''}`}>
      <Link className={styles.homeLink} href="/"><PiHouse className={styles.homeIcon} /></Link>
      <Image className={styles.logo} src={LogoCentral} alt="Virtosu Gallery Logo" />
      <span className={styles.languageLink} onClick={updateLocale}>{localeText}</span>
    </div>
  );
};
