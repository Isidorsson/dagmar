import type { PageServerLoad } from './$types';
import { getCakeBySlug } from '$lib/server/source';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const cake = await getCakeBySlug(params.slug);
	if (!cake) throw error(404, 'Cake not found');
	return { cake };
};
