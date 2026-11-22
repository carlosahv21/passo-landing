/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // Paleta Passo, modo claro del dashboard (apps/web/src/config/themeConfig.js)
                "tinta": "#1D2433",     // texto principal
                "gris": "#5F6B7A",      // texto secundario
                "suave": "#8A94A3",     // texto terciario
                "fondo": "#F4F7FB",     // canvas
                "linea": "#E3E8EF",     // bordes
                "azul": "#0A84FF",      // primario
                "azul-suave": "#E8F3FF",
                "cielo": "#4DA3FF",
                "oro": "#F2B33D",
                "verde": "#22A06B",
            },
            fontFamily: {
                "sans": ["Inter", "system-ui", "sans-serif"],
                "hand": ["Caveat", "cursive"],
            },
            boxShadow: {
                "tarjeta": "0 1px 2px rgba(29, 36, 51, 0.04), 0 8px 24px rgba(29, 36, 51, 0.06)",
                "flotante": "0 2px 6px rgba(29, 36, 51, 0.05), 0 24px 48px -12px rgba(29, 36, 51, 0.16)",
            },
        },
    },
    plugins: [],
};
