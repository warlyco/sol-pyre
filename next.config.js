/** @type {import('next').NextConfig} */
const { withAxiom } = require("next-axiom");

const nextConfig = withAxiom({
  reactStrictMode: true,
  images: {
    domains: ["arweave.net", "nftstorage.link"],
  },
});

module.exports = nextConfig;
