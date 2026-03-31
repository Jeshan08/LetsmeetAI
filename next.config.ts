import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   webpack: (config) => {
    config.externals.push({
      bufferutil: "bufferutil",
      "utf-8-validate": "utf-8-validate",
    });
    return config;
  },
};

export default nextConfig;
