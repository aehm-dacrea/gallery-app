import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import { PiHouse } from "react-icons/pi";
import LogoCentral from "@/assets/logo-central.svg";
import styles from "./NavigationBar.module.css";

export const NavigationBar = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const updateLocale = () => {
    const nextLocale = router.locale === 'en-US' ? 'ro-MD' : 'en-US';
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  }

  return (
    <div className={styles.navigationBar}>
      <Link className={styles.homeLink} href="/"><PiHouse className={styles.homeIcon} /></Link>
      <Image className={styles.logo} src={LogoCentral} alt="Virtosu Gallery Logo" />
      <span className={styles.languageLink} onClick={updateLocale}>{router.locale === 'en-US' ? 'Ro' : 'En'}</span>
    </div>
  );
};
