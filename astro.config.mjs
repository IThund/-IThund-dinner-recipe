import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ithund.github.io',
  integrations: [tailwind()],
  output: 'static',
  build: {
    format: 'file'
  },
  server: {
    port: 3000,
    host: true
  }
});