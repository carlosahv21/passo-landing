import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    // TODO: cambiar por el dominio real antes de salir a producción
    site: 'https://passo.app',
    integrations: [react(), tailwind()],
});
