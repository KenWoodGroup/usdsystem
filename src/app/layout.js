import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AOSProvider from "@/components/AOSProvider";
import I18nInitializer from "@/components/I18nInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* =========================
   GLOBAL SEO
========================= */
export const metadata = {
  title: {
    default: "USD System",
    template: "%s | USD System",
  },
  description: "USD System - единая B2B платформа для поиска всех продуктов по выгодным ценам в Узбекистане. ERP для производства и CRM для строительных компаний.",
  metadataBase: new URL("https://usdsystem.uz"),
  alternates: {
    canonical: "https://usdsystem.uz",
  },
  openGraph: {
    title: "USD System | Поиск строительных материалов в Узбекистане",
    description: "USD System - единая B2B платформа для поиска всех продуктов по выгодным ценам в Узбекистане.",
    url: "https://usdsystem.uz",
    siteName: "USD System",
    images: [
      {
        url: "https://usdsystem.uz/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "USD System",
      },
    ],
    locale: "ru_UZ",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico?v=2",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nInitializer />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XL4ZTTLHY5"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XL4ZTTLHY5');
          `}
        </Script>

        <AOSProvider />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
