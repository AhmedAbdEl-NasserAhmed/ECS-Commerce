import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "res.cloudinary.com",
      "images.pexels.com",
      "images.unsplash.com",
      "plus.unsplash.com",
    ],
  },
};

export default withNextIntl(nextConfig);
