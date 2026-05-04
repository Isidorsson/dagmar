import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { cakeCategory, dietaryTag } from './schema';
import { requireOwner } from './_lib/auth';

export const list = query({
	args: {
		category: v.optional(cakeCategory),
		onlyAvailable: v.optional(v.boolean())
	},
	handler: async (ctx, { category, onlyAvailable }) => {
		const all = category
			? await ctx.db
					.query('cakes')
					.withIndex('by_category', (q) => q.eq('category', category))
					.collect()
			: await ctx.db.query('cakes').collect();
		const filtered = onlyAvailable ? all.filter((c) => c.available) : all;
		return Promise.all(
			filtered
				.sort((a, b) => a.sortOrder - b.sortOrder)
				.map(async (c) => ({
					...c,
					imageUrl: c.imageStorageId ? await ctx.storage.getUrl(c.imageStorageId) : null
				}))
		);
	}
});

export const featured = query({
	args: { limit: v.optional(v.number()) },
	handler: async (ctx, { limit = 6 }) => {
		const items = await ctx.db
			.query('cakes')
			.withIndex('by_featured', (q) => q.eq('featured', true))
			.collect();
		return Promise.all(
			items
				.filter((c) => c.available)
				.sort((a, b) => a.sortOrder - b.sortOrder)
				.slice(0, limit)
				.map(async (c) => ({
					...c,
					imageUrl: c.imageStorageId ? await ctx.storage.getUrl(c.imageStorageId) : null
				}))
		);
	}
});

export const bySlug = query({
	args: { slug: v.string() },
	handler: async (ctx, { slug }) => {
		const cake = await ctx.db
			.query('cakes')
			.withIndex('by_slug', (q) => q.eq('slug', slug))
			.unique();
		if (!cake) return null;
		return {
			...cake,
			imageUrl: cake.imageStorageId ? await ctx.storage.getUrl(cake.imageStorageId) : null
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
		category: cakeCategory,
		priceFrom: v.optional(v.number()),
		imageStorageId: v.optional(v.id('_storage')),
		allergens: v.array(v.string()),
		dietary: v.array(dietaryTag),
		available: v.boolean(),
		featured: v.boolean()
	},
	handler: async (ctx, args) => {
		await requireOwner(ctx);
		const existing = await ctx.db
			.query('cakes')
			.withIndex('by_slug', (q) => q.eq('slug', args.slug))
			.unique();
		if (existing) throw new Error('Slug already exists');
		const last = await ctx.db.query('cakes').collect();
		const sortOrder = last.length ? Math.max(...last.map((c) => c.sortOrder)) + 1 : 1;
		return ctx.db.insert('cakes', { ...args, sortOrder });
	}
});

export const update = mutation({
	args: {
		id: v.id('cakes'),
		patch: v.object({
			slug: v.optional(v.string()),
			nameSv: v.optional(v.string()),
			nameEn: v.optional(v.string()),
			descSv: v.optional(v.string()),
			descEn: v.optional(v.string()),
			category: v.optional(cakeCategory),
			priceFrom: v.optional(v.number()),
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
	args: { id: v.id('cakes') },
	handler: async (ctx, { id }) => {
		await requireOwner(ctx);
		const cake = await ctx.db.get(id);
		if (cake?.imageStorageId) await ctx.storage.delete(cake.imageStorageId);
		await ctx.db.delete(id);
	}
});

export const reorder = mutation({
	args: { orderedIds: v.array(v.id('cakes')) },
	handler: async (ctx, { orderedIds }) => {
		await requireOwner(ctx);
		await Promise.all(orderedIds.map((id, idx) => ctx.db.patch(id, { sortOrder: idx + 1 })));
	}
});
