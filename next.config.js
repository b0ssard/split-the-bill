const dotenv = require("dotenv");

dotenv.config();

const nextConfig = {
  env: {
    NEXT_PUBLIC_API_KEY: process.env.API_KEY,
  },
};

module.exports = nextConfig;
