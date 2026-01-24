import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// GitHub Pages deployment is handled automatically by withastro/action@v2
// which sets site and base from the repository settings during CI build.
// No manual configuration needed here.

export default defineConfig({
  integrations: [tailwind()],
});
