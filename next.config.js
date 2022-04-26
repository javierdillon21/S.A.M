/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "sam6f16f2f46a8a452b96efa0d22a9e16c0120558-dev.s3.us-east-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
