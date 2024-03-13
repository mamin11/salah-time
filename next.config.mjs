/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    // disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
    register: true, // Register the PWA service worker
    skipWaiting: true, 
});

const nextConfig = {
    reactStrictMode: true, // Enable React strict mode for improved error handling
    swcMinify: true      // Enable SWC minification for improved performance
    // compiler: {
    //   removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
    // },
};

export default withPWA(nextConfig);

// export default nextConfig;
