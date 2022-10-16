/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["dev.ramayudanto.com"],
  },
};

module.exports = nextConfig;
