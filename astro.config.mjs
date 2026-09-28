import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://analisereview.com.br',
  // output "static" is the default and now behaves like the old "hybrid":
  // pages prerender unless they export `prerender = false` (blog + webhook).
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    // No <Image /> usage here (plain <img>), so compile images at build
    // time only and keep sharp out of the Workers runtime bundle.
    imageService: 'compile',
    runtime: {
      mode: 'local',
      type: 'pages',
      bindings: {
        DB: { type: 'd1' },
      },
    },
  }),
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always',
  },
});
