/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["dev.ramayudanto.com", "b.zmtcdn.com", "upload.wikimedia.org"],
  },
};

module.exports = nextConfig;
