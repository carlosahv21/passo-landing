import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    // Única fuente de verdad del dominio: de aquí salen canonical, og:url,
    // sitemap.xml y robots.txt. Es el host de la LANDING, no el de la app
    // (esa vive en app.passodance.com, ver PUBLIC_APP_URL).
    // www y no el apex: passodance.com ya hace 308 a www.
    site: 'https://www.passodance.com',
    integrations: [react(), tailwind()],
});
