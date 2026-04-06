import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  webpack: (config: any, { isServer }: any) => {
    // Fix for Excalidraw roughjs import issue with Webpack 5 ESM strict resolution
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.fullySpecified = false;
    
    // Add roughjs alias to fix missing .js extension issue
    if (!isServer) {
      config.resolve.alias['roughjs/bin/rough'] = path.resolve(
        __dirname,
        'node_modules/roughjs/bin/rough.js'
      );
    }
    
    return config;
  },
};

export default nextConfig;
