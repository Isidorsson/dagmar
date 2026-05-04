import type { PageServerLoad } from './$types';
import { listFeaturedCakes, listReviews, pinnedNews } from '$lib/server/source';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({ 'cache-control': 'public, max-age=300, s-maxage=3600' });
	const [featured, reviewsData, news] = await Promise.all([
		listFeaturedCakes(6),
		listReviews(),
		pinnedNews()
	]);
	return { featured, reviewsData, news };
};
