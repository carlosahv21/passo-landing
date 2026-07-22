/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Paleta Passo — "noche eléctrica"
                "noche": "#0E1116",
                "pista": "#161C24",
                "claro": "#E8EDF4",
                "azul": "#0A84FF",
                "oro": "#F2B33D",
                "cielo": "#4DA3FF",
                // Aliases legacy (modales aún los usan) — mapeados a la nueva paleta
                "background": "#0A0D12",
                "primary-blue": "#0A84FF",
                "bg-dark": "#0E1116",
                "container-dark": "#161C24",
                "text-base": "#E8EDF4",
                "border-base": "#26303C",
            },
            fontFamily: {
                "sans": ["Figtree", "sans-serif"],
                "display": ["Fraunces", "serif"],
                "mono": ["Space Grotesk", "monospace"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "3xl": "1.5rem",
                "full": "9999px"
            },
        },
    },
    plugins: [],
};
