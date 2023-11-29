import dotenv from "dotenv";

dotenv.config();

const nextConfig = {
  env: {
    NEXT_PUBLIC_API_KEY: process.env.API_KEY,
  },
};

export default nextConfig;
