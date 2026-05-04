/**
 * Single switch: live mode (real Convex/Google/Resend/Clerk) vs demo mode (in-memory dummy data).
 * Demo mode is automatic when API keys are absent — lets the site run without any setup.
 *
 * Each helper returns a Promise so the live implementation can be a true network call.
 * Mutations in demo mode write to the in-memory store; data resets on server restart.
 */

import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import {
	dummyCakes,
	dummyReviews,
	dummyHours,
	dummyHolidays,
	dummyNews,
	dummySiteConfig,
	dummyCustomOrders,
	type DummyCake,
	type DummyReview
} from './dummy';

export const isLive = Boolean(publicEnv.PUBLIC_CONVEX_URL);
export const isLiveReviews = Boolean(env.GOOGLE_PLACES_API_KEY && env.GOOGLE_PLACE_ID);
export const isLiveAuth = Boolean(publicEnv.PUBLIC_CLERK_PUBLISHABLE_KEY);

type OrderStatus = 'new' | 'seen' | 'accepted' | 'declined';
type Order = {
	_id: string;
	customerName: string;
	email: string;
	phone: string;
	desiredDate: string;
	occasion: string;
	designNotes: string;
	referenceImageUrl: string | null;
	allergens: string;
	servings: number;
	status: OrderStatus;
	createdAt: number;
};
type News = {
	_id: string;
	titleSv: string;
	titleEn: string;
	bodySv: string;
	bodyEn: string;
	imageUrl: string | null;
	publishedAt: number;
	pinned: boolean;
};

let cakes: DummyCake[] = [...dummyCakes];
let orders: Order[] = [...dummyCustomOrders];
let news: News[] = [...dummyNews];
let hours = [...dummyHours];
let holidays = [...dummyHolidays];
let siteConfig = { ...dummySiteConfig };

export async function listCakes(opts: { category?: string; onlyAvailable?: boolean } = {}) {
	let result = cakes;
	if (opts.category) result = result.filter((c) => c.category === opts.category);
	if (opts.onlyAvailable) result = result.filter((c) => c.available);
	return result.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getCakeBySlug(slug: string) {
	return cakes.find((c) => c.slug === slug) ?? null;
}

export async function listFeaturedCakes(limit = 6) {
	return cakes
		.filter((c) => c.featured && c.available)
		.sort((a, b) => a.sortOrder - b.sortOrder)
		.slice(0, limit);
}

export async function createCake(input: Omit<DummyCake, '_id' | 'sortOrder'>) {
	const sortOrder = cakes.length ? Math.max(...cakes.map((c) => c.sortOrder)) + 1 : 1;
	const cake: DummyCake = { ...input, _id: `demo-${Date.now()}`, sortOrder };
	cakes = [...cakes, cake];
	return cake;
}

export async function updateCake(id: string, patch: Partial<DummyCake>) {
	cakes = cakes.map((c) => (c._id === id ? { ...c, ...patch } : c));
}

export async function deleteCake(id: string) {
	cakes = cakes.filter((c) => c._id !== id);
}

export async function listReviews(): Promise<{
	rating: number;
	totalRatings: number;
	reviews: DummyReview[];
}> {
	if (isLiveReviews) {
		try {
			const res = await fetch(
				`https://places.googleapis.com/v1/places/${env.GOOGLE_PLACE_ID}?fields=rating,userRatingCount,reviews&languageCode=sv`,
				{
					headers: {
						'X-Goog-Api-Key': env.GOOGLE_PLACES_API_KEY!
					}
				}
			);
			if (!res.ok) throw new Error(`Places API ${res.status}`);
			const data = await res.json();
			return {
				rating: data.rating ?? 0,
				totalRatings: data.userRatingCount ?? 0,
				reviews: (data.reviews ?? []).map((r: any) => ({
					authorName: r.authorAttribution?.displayName ?? 'Anonymous',
					rating: r.rating ?? 5,
					text: r.text?.text ?? r.originalText?.text ?? '',
					relativeTime: r.relativePublishTimeDescription ?? '',
					profilePhotoUrl: r.authorAttribution?.photoUri
				}))
			};
		} catch (err) {
			console.warn('[reviews] live fetch failed, using dummy:', err);
		}
	}
	return {
		rating: 4.8,
		totalRatings: 127,
		reviews: dummyReviews
	};
}

export async function listHours() {
	return hours.sort((a, b) => a.weekday - b.weekday);
}

export async function upsertHours(weekday: number, patch: Partial<(typeof hours)[number]>) {
	hours = hours.map((h) => (h.weekday === weekday ? { ...h, ...patch } : h));
}

export async function listUpcomingHolidays() {
	const today = new Date().toISOString().slice(0, 10);
	return holidays.filter((h) => h.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

export async function listNews(limit = 10) {
	return [...news].sort((a, b) => b.publishedAt - a.publishedAt).slice(0, limit);
}

export async function pinnedNews() {
	return news.find((n) => n.pinned) ?? null;
}

export async function createNews(input: {
	titleSv: string;
	titleEn: string;
	bodySv: string;
	bodyEn: string;
	imageUrl: string | null;
	pinned: boolean;
}) {
	const item = { _id: `n-${Date.now()}`, ...input, publishedAt: Date.now() };
	news = [item, ...news];
	return item;
}

export async function deleteNews(id: string) {
	news = news.filter((n) => n._id !== id);
}

export async function getSiteConfig() {
	return siteConfig;
}

export async function updateSiteConfig(patch: Partial<typeof siteConfig>) {
	siteConfig = { ...siteConfig, ...patch };
}

export async function createCustomOrder(input: {
	customerName: string;
	email: string;
	phone: string;
	desiredDate: string;
	occasion: string;
	designNotes: string;
	allergens: string;
	servings: number;
}) {
	const order = {
		_id: `o-${Date.now()}`,
		...input,
		referenceImageUrl: null,
		status: 'new' as const,
		createdAt: Date.now()
	};
	orders = [order, ...orders];
	return order;
}

export async function listCustomOrders(status?: 'new' | 'seen' | 'accepted' | 'declined') {
	const filtered = status ? orders.filter((o) => o.status === status) : orders;
	return [...filtered].sort((a, b) => b.createdAt - a.createdAt);
}

export async function newOrdersCount() {
	return orders.filter((o) => o.status === 'new').length;
}

export async function setOrderStatus(id: string, status: 'new' | 'seen' | 'accepted' | 'declined') {
	orders = orders.map((o) => (o._id === id ? { ...o, status } : o));
}
