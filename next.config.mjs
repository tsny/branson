/** @type {import('next').NextConfig} */
const nextConfig = {
  // next.config.js
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.imgur.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "preview.redd.it",
        port: "",
      },
    ],
  },
};

export default nextConfig;
