import type { ReactNode, FC } from 'react';
import Head from 'next/head';
import styles from './Layout.module.css';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Virtosu Art Gallery</title>
        <meta property="og:title" content="Virtosu Art Gallery" key="title" />
      </Head>
      {children}
    </div>
  );
}
