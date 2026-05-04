import type { Actions, PageServerLoad } from './$types';
import { listNews, createNews, deleteNews } from '$lib/server/source';

export const load: PageServerLoad = async () => {
	const items = await listNews(20);
	return { items };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const f = await request.formData();
		await createNews({
			titleSv: String(f.get('titleSv') ?? ''),
			titleEn: String(f.get('titleEn') ?? ''),
			bodySv: String(f.get('bodySv') ?? ''),
			bodyEn: String(f.get('bodyEn') ?? ''),
			imageUrl: String(f.get('imageUrl') ?? '') || null,
			pinned: f.get('pinned') === 'on'
		});
		return { ok: true };
	},
	delete: async ({ request }) => {
		const f = await request.formData();
		await deleteNews(String(f.get('id')));
		return { ok: true };
	}
};
