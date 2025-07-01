import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",     // 👈 required
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",     // 👈 required
        hostname: "res.cloudinary.com", // 👈 ADD THIS
      },
    ],
  },
};

export default nextConfig;
