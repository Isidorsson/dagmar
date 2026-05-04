import type { Actions, PageServerLoad } from './$types';
import { listHours, upsertHours } from '$lib/server/source';

export const load: PageServerLoad = async () => {
	const hours = await listHours();
	return { hours };
};

const presets: Record<string, { weekday: number; openTime: string; closeTime: string; closed: boolean }[]> = {
	standard: [
		{ weekday: 0, openTime: '', closeTime: '', closed: true },
		{ weekday: 1, openTime: '06:00', closeTime: '17:00', closed: false },
		{ weekday: 2, openTime: '06:00', closeTime: '17:00', closed: false },
		{ weekday: 3, openTime: '06:00', closeTime: '17:00', closed: false },
		{ weekday: 4, openTime: '06:00', closeTime: '17:00', closed: false },
		{ weekday: 5, openTime: '06:00', closeTime: '17:00', closed: false },
		{ weekday: 6, openTime: '08:00', closeTime: '14:00', closed: false }
	],
	summer: [
		{ weekday: 0, openTime: '', closeTime: '', closed: true },
		{ weekday: 1, openTime: '07:00', closeTime: '16:00', closed: false },
		{ weekday: 2, openTime: '07:00', closeTime: '16:00', closed: false },
		{ weekday: 3, openTime: '07:00', closeTime: '16:00', closed: false },
		{ weekday: 4, openTime: '07:00', closeTime: '16:00', closed: false },
		{ weekday: 5, openTime: '07:00', closeTime: '16:00', closed: false },
		{ weekday: 6, openTime: '09:00', closeTime: '13:00', closed: false }
	]
};

export const actions: Actions = {
	save: async ({ request }) => {
		const f = await request.formData();
		const weekday = Number(f.get('weekday'));
		await upsertHours(weekday, {
			openTime: String(f.get('openTime') ?? ''),
			closeTime: String(f.get('closeTime') ?? ''),
			closed: f.get('closed') === 'on'
		});
		return { ok: true, weekday };
	},
	applyPreset: async ({ request }) => {
		const f = await request.formData();
		const preset = String(f.get('preset') ?? '');
		const days = presets[preset];
		if (!days) return { ok: false };
		await Promise.all(days.map((d) => upsertHours(d.weekday, d)));
		return { ok: true };
	}
};
