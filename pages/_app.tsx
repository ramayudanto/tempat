import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";
import Script from "next/script";

export const CoordinateContext = createContext(null as any);

export default function App({ Component, pageProps: { session, ...pageProps } }: any) {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  return (
    <SessionProvider session={session}>
      <CoordinateContext.Provider value={{ latitude, longitude, setLatitude, setLongitude }}>
        <Component {...pageProps} />
        <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID2}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID2}');`
          }
        </Script>
      </CoordinateContext.Provider>
    </SessionProvider>
  );
}
