import type { RequestHandler } from './$types';
import { listCakes } from '$lib/server/source';

const SITE = 'https://dagmarcarlssons.se';

export const GET: RequestHandler = async () => {
	const cakes = await listCakes({ onlyAvailable: true });
	const staticPaths = ['/', '/tartor', '/bestall', '/oppettider', '/kontakt', '/om-oss'];
	const urls = [
		...staticPaths.map((p) => ({ loc: `${SITE}${p}`, lastmod: new Date().toISOString() })),
		...cakes.map((c) => ({ loc: `${SITE}/tartor/${c.slug}`, lastmod: new Date().toISOString() }))
	];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}
</urlset>`;
	return new Response(body, {
		headers: { 'content-type': 'application/xml', 'cache-control': 'public, max-age=3600' }
	});
};
