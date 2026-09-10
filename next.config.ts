import type { NextConfig } from "next";
import { isGithubPages, repoName } from "./lib/base-path";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(isGithubPages
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
};

export default nextConfig;
