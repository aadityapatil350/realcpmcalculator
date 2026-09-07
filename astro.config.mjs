// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://realcpmcalculator.com',
  // Serve every route without a trailing slash so the built URL, the
  // <link rel="canonical"> in BaseLayout, the internal <a href> links and the
  // @astrojs/sitemap entries all agree. Pages previously built as
  // /foo/index.html (served at /foo/) while canonicals pointed at /foo.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
