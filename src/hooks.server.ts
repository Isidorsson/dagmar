import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;
	if (path === '/tartor' || path === '/tartor/') {
		throw redirect(301, `/sortiment/tartor${event.url.search}`);
	}
	if (path.startsWith('/tartor/')) {
		const slug = path.slice('/tartor/'.length).replace(/\/$/, '');
		throw redirect(301, `/sortiment/${slug}${event.url.search}`);
	}

	const langParam = event.url.searchParams.get('lang');
	if (langParam === 'sv' || langParam === 'en') {
		event.cookies.set('lang', langParam, { path: '/', maxAge: 60 * 60 * 24 * 365 });
		event.locals.lang = langParam;
	} else {
		const cookieLang = event.cookies.get('lang');
		event.locals.lang = cookieLang === 'en' ? 'en' : 'sv';
	}
	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%lang%', event.locals.lang).replace('%paraglide.lang%', event.locals.lang)
	});
};
