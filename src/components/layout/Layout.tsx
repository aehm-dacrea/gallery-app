import type { ReactNode, FC } from 'react';
import { NavigationBar } from "@/components/navigationBar";
import styles from './Layout.module.css';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {

  return (
    <div className={styles.container}>
      <NavigationBar />
      {children}
    </div>
  );
}
