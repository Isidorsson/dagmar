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

const weekOrder = [1, 2, 3, 4, 5, 6, 0];

export const actions: Actions = {
	save: async ({ request }) => {
		const f = await request.formData();
		const weekday = Number(f.get('weekday'));
		const openTime = String(f.get('openTime') ?? '');
		const closeTime = String(f.get('closeTime') ?? '');
		const closed = f.get('closed') === 'on';
		const safeClose = !closed && closeTime && openTime && closeTime < openTime ? openTime : closeTime;
		await upsertHours(weekday, { openTime, closeTime: safeClose, closed });
		return { ok: true, weekday };
	},
	applyPreset: async ({ request }) => {
		const f = await request.formData();
		const preset = String(f.get('preset') ?? '');
		const days = presets[preset];
		if (!days) return { ok: false };
		await Promise.all(days.map((d) => upsertHours(d.weekday, d)));
		return { ok: true };
	},
	copyFromPrevious: async ({ request }) => {
		const f = await request.formData();
		const wd = Number(f.get('weekday'));
		const idx = weekOrder.indexOf(wd);
		if (idx <= 0) return { ok: false };
		const prevWd = weekOrder[idx - 1];
		const all = await listHours();
		const prev = all.find((h) => h.weekday === prevWd);
		if (!prev) return { ok: false };
		await upsertHours(wd, {
			openTime: prev.openTime,
			closeTime: prev.closeTime,
			closed: prev.closed
		});
		return { ok: true, weekday: wd };
	}
};
