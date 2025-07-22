import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ttntour.com',
      },
      {
        protocol: 'https',
        hostname: 'file-service.lnwtiao.com',
      },
      {
        protocol: 'https',
        hostname: 'www.zegotravel.com',
      },
      {
        protocol: 'https',
        hostname: 'www.ttnplus.co.th',
      },
      {
        protocol: 'https',
        hostname: 'superbholidayz.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bestindochina.com',
      },
      {
        protocol: 'https',
        hostname: 'media-prod.tourwow.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media-prod.twbits.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
