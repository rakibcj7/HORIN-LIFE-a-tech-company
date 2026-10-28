import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load .env (and .env.local) explicitly so scripts and config-time code see
// the same variables the server does. Next.js also loads these natively, but
// this keeps standalone Node scripts (migrations, checks) consistent.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, ".env") });
config({ path: path.resolve(__dirname, ".env.local"), override: true });

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
