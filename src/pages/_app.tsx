import type { AppProps } from "next/app";
import { Open_Sans, Frank_Ruhl_Libre } from 'next/font/google';
import { Layout } from "@/components/layout/Layout";
import "@/styles/globals.css";

const openSans = Open_Sans({ subsets: ['latin'] });
const frankRuhlLibre = Frank_Ruhl_Libre({ subsets: ['latin'], weight: "600" });

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${openSans.style.fontFamily};
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: ${frankRuhlLibre.style.fontFamily};
          font-weight: ${frankRuhlLibre.style.fontWeight};
        }
      `}</style>
      <link rel="icon" href="/public/favicon.ico" sizes="any" />
      <link
        rel="icon"
        href="/public/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <link
        rel="apple-touch-icon"
        href="/public/apple-icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
