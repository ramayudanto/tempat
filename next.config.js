/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "dev.ramayudanto.com",
      "b.zmtcdn.com",
      "upload.wikimedia.org",
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "ramayudanto.com",
      "firebasestorage.googleapis.com",
      "i.gojekapi.com",
      "socialistmodernism.com",
      "uploads-ssl.webflow.com",
      "tempatapp.sgp1.cdn.digitaloceanspaces.com",
      "tempat.app",
      "tempatapp.sgp1.digitaloceanspaces.com",
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
