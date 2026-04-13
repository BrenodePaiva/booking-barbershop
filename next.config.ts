import type { NextConfig } from "next";

const bucket = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_REGION;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${bucket}.s3.${region}.amazonaws.com`,
      },
    ],
  },
};

export default nextConfig;
