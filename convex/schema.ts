import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const cakeCategory = v.union(
	v.literal('ordinarie'),
	v.literal('specialtarta'),
	v.literal('eget-motiv')
);

export const dietaryTag = v.union(
	v.literal('glutenfri'),
	v.literal('laktosfri'),
	v.literal('vegan'),
	v.literal('notfri')
);

export const orderStatus = v.union(
	v.literal('new'),
	v.literal('seen'),
	v.literal('accepted'),
	v.literal('declined')
);

export default defineSchema({
	cakes: defineTable({
		slug: v.string(),
		nameSv: v.string(),
		nameEn: v.string(),
		descSv: v.string(),
		descEn: v.string(),
		category: cakeCategory,
		priceFrom: v.optional(v.number()),
		imageStorageId: v.optional(v.id('_storage')),
		allergens: v.array(v.string()),
		dietary: v.array(dietaryTag),
		available: v.boolean(),
		featured: v.boolean(),
		sortOrder: v.number()
	})
		.index('by_slug', ['slug'])
		.index('by_category', ['category', 'sortOrder'])
		.index('by_featured', ['featured', 'sortOrder']),

	customOrders: defineTable({
		customerName: v.string(),
		email: v.string(),
		phone: v.string(),
		desiredDate: v.string(),
		occasion: v.string(),
		designNotes: v.string(),
		referenceImageId: v.optional(v.id('_storage')),
		allergens: v.string(),
		servings: v.number(),
		status: orderStatus,
		createdAt: v.number()
	}).index('by_status', ['status', 'createdAt']),

	hours: defineTable({
		weekday: v.number(),
		openTime: v.string(),
		closeTime: v.string(),
		closed: v.boolean()
	}).index('by_weekday', ['weekday']),

	holidays: defineTable({
		date: v.string(),
		labelSv: v.string(),
		labelEn: v.string(),
		closed: v.boolean(),
		openTime: v.optional(v.string()),
		closeTime: v.optional(v.string())
	}).index('by_date', ['date']),

	news: defineTable({
		titleSv: v.string(),
		titleEn: v.string(),
		bodySv: v.string(),
		bodyEn: v.string(),
		imageStorageId: v.optional(v.id('_storage')),
		publishedAt: v.number(),
		pinned: v.boolean()
	}).index('by_publishedAt', ['publishedAt']),

	siteConfig: defineTable({
		key: v.literal('singleton'),
		googlePlaceId: v.string(),
		instagramHandle: v.string(),
		contactPhone: v.string(),
		contactEmail: v.string(),
		address: v.string(),
		mapEmbedUrl: v.string()
	}).index('by_key', ['key'])
});
