/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'admin-sentido-migrante.onrender.com',
      },
    ],
  },
  allowedDevOrigins: ['sentidomigrante.local', 'app.sentidomigrante.local'],
};
export default nextConfig;
