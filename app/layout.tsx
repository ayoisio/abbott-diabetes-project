import React, { ReactNode } from "react";
import { Providers } from "./providers";
import { Inter, Karla } from "next/font/google";
import "./globals.css";

const inter = Inter({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "block",
  variable: "--font-inter",
});

const karla = Karla({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "block",
  variable: "--font-karla",
});

export const metadata = {
  title: "FreeStyle Abbott",
  description: "Real-Time Glucose Monitoring and Personalized Health Insights",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta
          content="Real-Time Glucose Monitoring and Personalized Health Insights"
          name="FreeStyle - Real-Time Glucose & Health Insights"
        />
        <meta
          content="FreeStyle - Real-Time Glucose & Health Insights"
          property="og:title"
        />
        <meta
          content="Real-Time Glucose Monitoring and Personalized Health Insights"
          property="og:description"
        />
        <meta content="%PUBLIC_URL%/fb-og-image.png" property="og:image" />
        <meta property="og:url" content="https://abbott.com" />
        <meta
          property="og:site_name"
          content="FreeStyle
         - Real-Time Glucose & Health Insights"
        />
        <meta
          content="FreeStyle
         - Real-Time Glucose & Health Insights"
          property="twitter:title"
        />
        <meta
          content="Real-Time Glucose Monitoring and Personalized Health Insights"
          property="twitter:description"
        />
        <meta
          content="%PUBLIC_URL%/twitter-card.png"
          property="twitter:image"
        />
        <meta property="og:type" content="Article" />
        <meta content="summary" name="twitter:card" />
        <meta name="twitter:site" content="@abbott" />
        <meta name="twitter:creator" content="@abbott" />
        <meta property="fb:admins" content="132951670226590" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${karla.variable} ${inter.variable} bg-n-7 font-sans text-[1rem] leading-6 -tracking-[.01em] text-n-7 antialiased md:bg-n-1 dark:text-n-1 dark:md:bg-n-6`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
