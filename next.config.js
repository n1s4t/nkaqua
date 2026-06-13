/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['localhost', '127.0.0.1', '*.localhost', '192.168.0.135', '*.local'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'atdghbqfiiqxtcgrnbns.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;