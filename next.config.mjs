/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
// A static export for an ordinary web host at the site's own domain, such as Inleed (npm run build:inleed).
const isStaticExport = isGithubPages || process.env.STATIC_EXPORT === "true";
const basePath = isGithubPages ? "/Bugg-test" : "";

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
  },
  // Plain files in public/ (such as the photos) need the base path added by hand.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    TRAILING_SLASH: String(isStaticExport),
  },
  // Applied for the GitHub Pages preview build (see .github/workflows/deploy-pages.yml) and the Inleed build
  // (scripts/build-inleed.mjs). Without either, it is a normal Next.js server build.
  ...(isStaticExport && {
    output: "export",
    basePath,
    trailingSlash: true,
  }),
};

export default nextConfig;
