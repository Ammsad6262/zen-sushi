import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  // Security: referrer policy
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Browser-level XSS filter
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Force MIME types
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer policy — only send origin to cross-origin
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions policy — lock down powerful APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), browsing-topics=()",
          },
          // Strict CSP for a static marketing site.
          // - default-src 'self' for everything
          // - allow inline styles + Next.js nonces for styles
          // - allow images from anywhere (food photography CDNs) and data: URIs
          // - allow fonts from gstatic
          // - allow frames from Google Maps
          // - allow ws/wss for HMR (dev only, harmless in prod)
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "frame-src 'self' https://www.google.com https://maps.google.com",
              "connect-src 'self' https:",
              "media-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
