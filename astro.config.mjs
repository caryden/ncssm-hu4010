import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// GitHub Pages deployment configuration
// Set these via environment variables or update for your deployment:
// - SITE_URL: Full URL (e.g., "https://ncssm.github.io")
// - BASE_PATH: Repository name with leading slash (e.g., "/ncssm-hu4010")
//
// For custom domain at root, use SITE_URL only with no BASE_PATH
const siteUrl = process.env.SITE_URL || 'https://ncssm.github.io';
const basePath = process.env.BASE_PATH || '/ncssm-hu4010';

export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [tailwind()],
  build: {
    // Ensure assets work with base path
    assets: '_astro',
  },
});
