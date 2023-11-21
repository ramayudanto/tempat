/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import Script from "next/script";

export const CoordinateContext = createContext(null as any);

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useRouter } from "next/router";

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug();
    },
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
  });
}

export default function App({ Component, pageProps: { session, ...pageProps } }: any) {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <SessionProvider session={session}>
        <CoordinateContext.Provider value={{ latitude, longitude, setLatitude, setLongitude }}>
          <Component {...pageProps} />
          <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID2}`} />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID2}');`}
          </Script>
        </CoordinateContext.Provider>
      </SessionProvider>
    </PostHogProvider>
  );
}
