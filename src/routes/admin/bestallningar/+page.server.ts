import type { Actions, PageServerLoad } from './$types';
import { listCustomOrders, setOrderStatus } from '$lib/server/source';

export const load: PageServerLoad = async () => {
	const orders = await listCustomOrders();
	return { orders };
};

export const actions: Actions = {
	setStatus: async ({ request }) => {
		const f = await request.formData();
		await setOrderStatus(String(f.get('id')), String(f.get('status')) as any);
		return { ok: true };
	}
};
