/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    domains: ["res.cloudinary.com", "upload.wikimedia.org"],
    unoptimized: true,
  },
};
