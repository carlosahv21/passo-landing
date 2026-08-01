import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    // Única fuente de verdad del dominio: de aquí salen canonical, og:url,
    // sitemap.xml y robots.txt. Al conectar passo.app a Vercel, cambiar solo
    // esta línea (y redirigir 301 desde el .vercel.app para no partir el SEO).
    site: 'https://passodance.vercel.app',
    integrations: [react(), tailwind()],
});
