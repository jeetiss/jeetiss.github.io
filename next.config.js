import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const getHeadersForSharedMemory = (source) => ({
  source,
  headers: [
    { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  headers: () => [getHeadersForSharedMemory("/:path*")],
};

const withExtract = createVanillaExtractPlugin();

export default withExtract(nextConfig);
