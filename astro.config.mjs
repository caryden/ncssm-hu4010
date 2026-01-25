import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// GitHub Pages configuration
// Site and base are required for proper asset paths and navigation
const site = process.env.GITHUB_ACTIONS
  ? 'https://caryden.github.io'
  : 'http://localhost:4321';

const base = process.env.GITHUB_ACTIONS
  ? '/ncssm-hu4010'
  : '';

export default defineConfig({
  site,
  base,
  integrations: [tailwind(), mdx()],
});
