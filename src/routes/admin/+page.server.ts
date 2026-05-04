import type { PageServerLoad } from './$types';
import { listCustomOrders, listCakes, listNews, newOrdersCount } from '$lib/server/source';

export const load: PageServerLoad = async () => {
	const [newCount, recentOrders, cakeCount, newsItems] = await Promise.all([
		newOrdersCount(),
		listCustomOrders().then((o) => o.slice(0, 5)),
		listCakes().then((c) => c.length),
		listNews(3)
	]);
	return { newCount, recentOrders, cakeCount, newsItems };
};
