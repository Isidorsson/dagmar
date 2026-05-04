import type { PageServerLoad } from './$types';
import { listUpcomingHolidays } from '$lib/server/source';

export const load: PageServerLoad = async () => {
	const holidays = await listUpcomingHolidays();
	return { holidays };
};
