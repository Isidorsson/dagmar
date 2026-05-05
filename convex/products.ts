import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { cakeCategory, dietaryTag, productType } from './schema';
import { requireOwner } from './_lib/auth';

export const list = query({
	args: {
		productType: v.optional(productType),
		category: v.optional(cakeCategory),
		onlyAvailable: v.optional(v.boolean())
	},
	handler: async (ctx, { productType: type, category, onlyAvailable }) => {
		let all;
		if (type) {
			all = await ctx.db
				.query('products')
				.withIndex('by_productType', (q) => q.eq('productType', type))
				.collect();
		} else if (category) {
			all = await ctx.db
				.query('products')
				.withIndex('by_category', (q) => q.eq('category', category))
				.collect();
		} else {
			all = await ctx.db.query('products').collect();
		}
		if (type && category) all = all.filter((p) => p.category === category);
		const filtered = onlyAvailable ? all.filter((p) => p.available) : all;
		return Promise.all(
			filtered
				.sort((a, b) => a.sortOrder - b.sortOrder)
				.map(async (p) => ({
					...p,
					imageUrl: p.imageStorageId ? await ctx.storage.getUrl(p.imageStorageId) : null
				}))
		);
	}
});

export const featured = query({
	args: {
		limit: v.optional(v.number()),
		productType: v.optional(productType)
	},
	handler: async (ctx, { limit = 6, productType: type }) => {
		const items = await ctx.db
			.query('products')
			.withIndex('by_featured', (q) => q.eq('featured', true))
			.collect();
		return Promise.all(
			items
				.filter((p) => p.available && (!type || p.productType === type))
				.sort((a, b) => a.sortOrder - b.sortOrder)
				.slice(0, limit)
				.map(async (p) => ({
					...p,
					imageUrl: p.imageStorageId ? await ctx.storage.getUrl(p.imageStorageId) : null
				}))
		);
	}
});

export const bySlug = query({
	args: { slug: v.string() },
	handler: async (ctx, { slug }) => {
		const product = await ctx.db
			.query('products')
			.withIndex('by_slug', (q) => q.eq('slug', slug))
			.unique();
		if (!product) return null;
		return {
			...product,
			imageUrl: product.imageStorageId ? await ctx.storage.getUrl(product.imageStorageId) : null
		};
	}
});

export const create = mutation({
	args: {
		slug: v.string(),
		nameSv: v.string(),
		nameEn: v.string(),
		descSv: v.string(),
		descEn: v.string(),
		productType,
		category: v.optional(cakeCategory),
		priceFrom: v.optional(v.number()),
		unitSv: v.optional(v.string()),
		unitEn: v.optional(v.string()),
		weightGrams: v.optional(v.number()),
		stockCount: v.optional(v.number()),
		imageStorageId: v.optional(v.id('_storage')),
		allergens: v.array(v.string()),
		dietary: v.array(dietaryTag),
		available: v.boolean(),
		featured: v.boolean()
	},
	handler: async (ctx, args) => {
		await requireOwner(ctx);
		const existing = await ctx.db
			.query('products')
			.withIndex('by_slug', (q) => q.eq('slug', args.slug))
			.unique();
		if (existing) throw new Error('Slug already exists');
		const last = await ctx.db.query('products').collect();
		const sortOrder = last.length ? Math.max(...last.map((p) => p.sortOrder)) + 1 : 1;
		return ctx.db.insert('products', { ...args, sortOrder });
	}
});

export const update = mutation({
	args: {
		id: v.id('products'),
		patch: v.object({
			slug: v.optional(v.string()),
			nameSv: v.optional(v.string()),
			nameEn: v.optional(v.string()),
			descSv: v.optional(v.string()),
			descEn: v.optional(v.string()),
			productType: v.optional(productType),
			category: v.optional(cakeCategory),
			priceFrom: v.optional(v.number()),
			unitSv: v.optional(v.string()),
			unitEn: v.optional(v.string()),
			weightGrams: v.optional(v.number()),
			stockCount: v.optional(v.number()),
			imageStorageId: v.optional(v.id('_storage')),
			allergens: v.optional(v.array(v.string())),
			dietary: v.optional(v.array(dietaryTag)),
			available: v.optional(v.boolean()),
			featured: v.optional(v.boolean()),
			sortOrder: v.optional(v.number())
		})
	},
	handler: async (ctx, { id, patch }) => {
		await requireOwner(ctx);
		await ctx.db.patch(id, patch);
	}
});

export const remove = mutation({
	args: { id: v.id('products') },
	handler: async (ctx, { id }) => {
		await requireOwner(ctx);
		const product = await ctx.db.get(id);
		if (product?.imageStorageId) await ctx.storage.delete(product.imageStorageId);
		await ctx.db.delete(id);
	}
});

export const reorder = mutation({
	args: { orderedIds: v.array(v.id('products')) },
	handler: async (ctx, { orderedIds }) => {
		await requireOwner(ctx);
		await Promise.all(orderedIds.map((id, idx) => ctx.db.patch(id, { sortOrder: idx + 1 })));
	}
});

export const generateUploadUrl = mutation({
	handler: async (ctx) => {
		await requireOwner(ctx);
		return ctx.storage.generateUploadUrl();
	}
});

export const setImage = mutation({
	args: {
		id: v.id('products'),
		storageId: v.id('_storage')
	},
	handler: async (ctx, { id, storageId }) => {
		await requireOwner(ctx);
		const existing = await ctx.db.get(id);
		if (existing?.imageStorageId) await ctx.storage.delete(existing.imageStorageId);
		await ctx.db.patch(id, { imageStorageId: storageId });
	}
});
