import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getProductBySlug } from '$lib/server/source';
import { typeForSlug } from '$lib/productTypes';

export const load: PageServerLoad = async ({ params }) => {
	if (typeForSlug(params.slug)) throw error(404, 'Not a product');
	const product = await getProductBySlug(params.slug);
	if (!product) throw error(404, 'Product not found');
	return { product };
};
