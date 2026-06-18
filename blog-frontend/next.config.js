/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.OUTPUT_STANDALONE === '1' ? 'standalone' : undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8081',
      },
      {
        protocol: 'http',
        hostname: 'backend',
        port: '8081',
      },
    ],
  },
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8081';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
