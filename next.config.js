const getHeadersForSharedMemory = (source) => ({
  source,
  headers: [
    { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [getHeadersForSharedMemory("/:path*")],
};

export default nextConfig;