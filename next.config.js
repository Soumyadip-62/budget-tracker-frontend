/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache"); 
const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  
};

module.exports = withPWA({
  pwa: {
    dest: "public",
    // register: true,
    // skipWaiting: true,
    runtimeCaching,
  },
});
