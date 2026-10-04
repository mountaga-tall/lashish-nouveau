import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com", pathname: "/mountaga-tall/menushish/main/images/**" }
    ]
  }
};

export default nextConfig;
