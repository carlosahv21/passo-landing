import type { APIRoute } from "astro";

// Generado desde `site` en astro.config.mjs para que no se desincronice del dominio real.
export const GET: APIRoute = ({ site }) =>
    new Response(
        `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap.xml", site)}\n`,
        { headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
