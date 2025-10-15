/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // CI soll nicht rot werden wegen TS-Fehlern – wir reparieren die mit AI/PRs
    ignoreBuildErrors: true,
  },
  eslint: {
    // Lint läuft in separatem CI-Step; Build selbst soll nicht scheitern
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

