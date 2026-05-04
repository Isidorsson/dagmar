import type { PageServerLoad } from './$types';
import { listCakes } from '$lib/server/source';

export const load: PageServerLoad = async ({ url }) => {
	const cat = url.searchParams.get('cat');
	const diet = url.searchParams.get('diet');
	const cakes = await listCakes({
		category: cat ?? undefined,
		onlyAvailable: true
	});
	const filtered = diet ? cakes.filter((c) => c.dietary.includes(diet as any)) : cakes;
	return { cakes: filtered, activeCategory: cat, activeDiet: diet };
};
