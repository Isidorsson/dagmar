import type { Actions, PageServerLoad } from './$types';
import { getSiteConfig, updateSiteConfig } from '$lib/server/source';

export const load: PageServerLoad = async () => {
	const cfg = await getSiteConfig();
	return { cfg };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const f = await request.formData();
		await updateSiteConfig({
			googlePlaceId: String(f.get('googlePlaceId') ?? ''),
			instagramHandle: String(f.get('instagramHandle') ?? ''),
			contactPhone: String(f.get('contactPhone') ?? ''),
			contactEmail: String(f.get('contactEmail') ?? ''),
			address: String(f.get('address') ?? ''),
			mapEmbedUrl: String(f.get('mapEmbedUrl') ?? '')
		});
		return { ok: true };
	}
};
