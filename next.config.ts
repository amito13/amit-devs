import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
      {
        // App screenshots read from project READMEs (see src/lib/screens.ts).
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/amito13/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
