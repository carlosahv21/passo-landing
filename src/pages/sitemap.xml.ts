import type { APIRoute } from "astro";

// ponytail: una sola URL, sitemap a mano. Si algún día hay más páginas, @astrojs/sitemap.
export const GET: APIRoute = ({ site }) =>
    new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
        { headers: { "Content-Type": "application/xml; charset=utf-8" } },
    );
