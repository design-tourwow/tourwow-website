import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
// import "flag-icons/css/flag-icons.min.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LoadingProvider } from '@/components/LoadingProvider';

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TourWow - ทัวร์คุณภาพทั่วโลก",
  description: "ค้นพบโปรแกรมทัวร์และแพ็กเกจท่องเที่ยวคุณภาพทั่วโลกกับ TourWow สัมผัสประสบการณ์การเดินทางที่น่าประทับใจกับทีมงานมืออาชีพ",
  manifest: '/manifest.json',
  keywords: "ทัวร์ต่างประเทศ, แพ็กเกจทัวร์, ทัวร์พรีเมียม, ท่องเที่ยว, ทัวร์ทั่วโลก",
  authors: [{ name: "TourWow" }],
  creator: "TourWow",
  publisher: "TourWow",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    shortcut: '/favicon.ico'
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tourwow.vercel.app"), // Assuming this is the production URL
  openGraph: {
    title: "TourWow - ทัวร์คุณภาพทั่วโลก",
    description: "ค้นพบโปรแกรมทัวร์และแพ็กเกจท่องเที่ยวคุณภาพทั่วโลกกับ TourWow",
    url: "https://tourwow.vercel.app",
    siteName: "TourWow",
    images: [
      {
        url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "เที่ยวทั่วโลกกับ TourWow",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TourWow - ทัวร์คุณภาพทั่วโลก",
    description: "ค้นพบโปรแกรมทัวร์และแพ็กเกจท่องเที่ยวคุณภาพทั่วโลกกับ TourWow",
    images: ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TourWow" />
        <meta name="application-name" content="TourWow" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${kanit.className} antialiased bg-blue-50 text-gray-800 touch-manipulation`}>
        <LoadingProvider>
          <Header />
          <div className="pt-16">
            {children}
          </div>
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
