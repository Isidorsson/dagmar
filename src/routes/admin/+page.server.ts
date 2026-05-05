import type { PageServerLoad } from './$types';
import { listCustomOrders, listProducts, listNews, newOrdersCount } from '$lib/server/source';

export const load: PageServerLoad = async () => {
	const [newCount, recentOrders, productCount, newsItems] = await Promise.all([
		newOrdersCount(),
		listCustomOrders().then((o) => o.slice(0, 5)),
		listProducts().then((p) => p.length),
		listNews(3)
	]);
	return { newCount, recentOrders, productCount, newsItems };
};
