import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";

export const CoordinateContext = createContext(null as any);

export default function App({ Component, pageProps: { session, ...pageProps } }: any) {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  return (
    <SessionProvider session={session}>
      <CoordinateContext.Provider value={{ latitude, longitude, setLatitude, setLongitude }}>
        <Component {...pageProps} />
      </CoordinateContext.Provider>
    </SessionProvider>
  );
}
