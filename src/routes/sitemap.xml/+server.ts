import type { RequestHandler } from './$types';
import { listProducts } from '$lib/server/source';

const SITE = 'https://example.com';
const TYPE_PATHS = ['/sortiment/tartor', '/sortiment/kakor', '/sortiment/brod', '/sortiment/bakverk', '/sortiment/annat'];

export const GET: RequestHandler = async () => {
	const products = await listProducts({ onlyAvailable: true });
	const staticPaths = ['/', '/sortiment', ...TYPE_PATHS, '/bestall', '/oppettider', '/kontakt', '/om-oss'];
	const urls = [
		...staticPaths.map((p) => ({ loc: `${SITE}${p}`, lastmod: new Date().toISOString() })),
		...products.map((p) => ({ loc: `${SITE}/sortiment/${p.slug}`, lastmod: new Date().toISOString() }))
	];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}
</urlset>`;
	return new Response(body, {
		headers: { 'content-type': 'application/xml', 'cache-control': 'public, max-age=3600' }
	});
};
