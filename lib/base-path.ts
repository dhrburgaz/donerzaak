/**
 * Single source of truth for the GitHub Pages basePath, shared between
 * next.config.ts and any metadata file (manifest.ts, etc.) that emits
 * root-relative asset URLs Next does not rewrite automatically.
 */
export const isGithubPages = process.env.GITHUB_PAGES === "true";
export const repoName = "donerzaak";
export const basePath = isGithubPages ? `/${repoName}` : "";
