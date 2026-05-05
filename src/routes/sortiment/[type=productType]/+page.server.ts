import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { listProducts } from '$lib/server/source';
import { typeForSlug } from '$lib/productTypes';

export const load: PageServerLoad = async ({ params, url }) => {
	const productType = typeForSlug(params.type);
	if (!productType) throw error(404, 'Unknown product type');

	const cat = url.searchParams.get('cat');
	const diet = url.searchParams.get('diet');

	const products = await listProducts({
		productType,
		category: productType === 'tarta' && cat ? cat : undefined,
		onlyAvailable: true
	});
	const filtered = diet
		? products.filter((p) => p.dietary.includes(diet as 'glutenfri' | 'laktosfri' | 'vegan' | 'notfri'))
		: products;

	return {
		products: filtered,
		productType,
		typeSlug: params.type,
		activeCategory: cat,
		activeDiet: diet
	};
};
