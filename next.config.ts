import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    browserDebugInfoInTerminal: {
      depthLimit: 5,
      edgeLimit: 100,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "g5bkk9ebz3.ufs.sh",
        pathname: "/f/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/js/script.js",
        destination: "https://datafa.st/js/script.js",
      },
      {
        source: "/api/events",
        destination: "https://datafa.st/api/events",
      },
    ];
  },
};

export default nextConfig;
