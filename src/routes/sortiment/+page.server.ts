import type { PageServerLoad } from './$types';
import { listProducts } from '$lib/server/source';

export const load: PageServerLoad = async ({ url }) => {
	const diet = url.searchParams.get('diet');
	const products = await listProducts({ onlyAvailable: true });
	const filtered = diet
		? products.filter((p) => p.dietary.includes(diet as 'glutenfri' | 'laktosfri' | 'vegan' | 'notfri'))
		: products;
	return { products: filtered, activeType: null, activeDiet: diet };
};
