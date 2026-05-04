import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { createCake, deleteCake, listCakes, updateCake } from '$lib/server/source';

export const load: PageServerLoad = async () => {
	const cakes = await listCakes();
	return { cakes };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const f = await request.formData();
		const slug = String(f.get('slug') ?? '').trim();
		if (!slug) return fail(400, { error: 'slug required' });
		await createCake({
			slug,
			nameSv: String(f.get('nameSv') ?? ''),
			nameEn: String(f.get('nameEn') ?? ''),
			descSv: String(f.get('descSv') ?? ''),
			descEn: String(f.get('descEn') ?? ''),
			category: (String(f.get('category') ?? 'ordinarie')) as any,
			priceFrom: Number(f.get('priceFrom') ?? 0) || 0,
			imageUrl: String(f.get('imageUrl') ?? ''),
			allergens: String(f.get('allergens') ?? '')
				.split(',')
				.map((s) => s.trim())
				.filter(Boolean),
			dietary: f.getAll('dietary').map(String) as any,
			available: f.get('available') === 'on',
			featured: f.get('featured') === 'on'
		});
		return { ok: true };
	},
	update: async ({ request }) => {
		const f = await request.formData();
		const id = String(f.get('id') ?? '');
		await updateCake(id, {
			nameSv: String(f.get('nameSv') ?? ''),
			nameEn: String(f.get('nameEn') ?? ''),
			descSv: String(f.get('descSv') ?? ''),
			descEn: String(f.get('descEn') ?? ''),
			priceFrom: Number(f.get('priceFrom') ?? 0) || 0,
			imageUrl: String(f.get('imageUrl') ?? ''),
			available: f.get('available') === 'on',
			featured: f.get('featured') === 'on'
		});
		return { ok: true };
	},
	delete: async ({ request }) => {
		const f = await request.formData();
		await deleteCake(String(f.get('id') ?? ''));
		return { ok: true };
	}
};
