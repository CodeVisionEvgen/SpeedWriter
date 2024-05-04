/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [{
      source: "/api/:path*",
      destination: "http://backend:4040/api/:path*"
    }]
  }
}

module.exports = nextConfig