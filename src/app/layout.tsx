import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";
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
  keywords: "ทัวร์ต่างประเทศ, แพ็กเกจทัวร์, ทัวร์พรีเมียม, ท่องเที่ยว, ทัวร์ทั่วโลก",
  authors: [{ name: "TourWow" }],
  creator: "TourWow",
  publisher: "TourWow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tourwow.vercel.app"), // Assuming this is the production URL
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
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
      <body className={`${kanit.className} antialiased bg-blue-50 text-gray-800`}>
        <LoadingProvider>
          <Header />
          {children}
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
