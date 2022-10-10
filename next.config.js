const withPWA = require("next-pwa")({
  dest: "public",
  // runtimeCaching,
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === "development",
});
// const runtimeCaching = require("next-pwa/cache");
module.exports = withPWA({
  reactStrictMode: true,
});
// import { copyWithin } from "next-pwa/cache";
