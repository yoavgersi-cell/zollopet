import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "**.blob.vercel-storage.com",
      },
    ],
  },
  // Duplicate-comparison consolidation (e.g. /embody-vs-altrx → /altrx-vs-embody)
  // is handled in the proxy (see SLUG_ALIASES in src/proxy.ts) so the alias
  // collapses in a single 301 instead of chaining with the migration redirect.
  async redirects() {
    return [
      // Briefly-published duplicate of the established cat weight-loss guide.
      {
        source: "/fresh-cat-food/articles/how-to-get-my-cat-to-lose-weight",
        destination: "/fresh-cat-food/articles/how-to-help-cat-lose-weight",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
