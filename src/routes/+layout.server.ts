import type { LayoutServerLoad } from './$types';
import { getSiteConfig, listHours } from '$lib/server/source';

export const load: LayoutServerLoad = async ({ locals }) => {
	const [siteConfig, hours] = await Promise.all([getSiteConfig(), listHours()]);
	return {
		lang: locals.lang,
		siteConfig,
		hours
	};
};
