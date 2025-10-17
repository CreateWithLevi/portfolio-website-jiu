import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  integrations: [svelte()],
  image: {
    domains: ['localhost'],
  },
  vite: {
    ssr: {
      noExternal: ['ogl', 'gsap', 'svelte-motion'],
    },
  },
});
