import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'media.istockphoto.com', "m.media-amazon.com",  "images-na.ssl-images-amazon.com"]
  }
};

export default nextConfig;
