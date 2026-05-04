import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { requireOwner } from './_lib/auth';

export const list = query({
	args: { limit: v.optional(v.number()) },
	handler: async (ctx, { limit = 10 }) => {
		const items = await ctx.db
			.query('news')
			.withIndex('by_publishedAt')
			.order('desc')
			.take(limit);
		return Promise.all(
			items.map(async (n) => ({
				...n,
				imageUrl: n.imageStorageId ? await ctx.storage.getUrl(n.imageStorageId) : null
			}))
		);
	}
});

export const pinned = query({
	args: {},
	handler: async (ctx) => {
		const items = await ctx.db.query('news').collect();
		return items
			.filter((n) => n.pinned && n.publishedAt <= Date.now())
			.sort((a, b) => b.publishedAt - a.publishedAt)
			.slice(0, 1);
	}
});

export const create = mutation({
	args: {
		titleSv: v.string(),
		titleEn: v.string(),
		bodySv: v.string(),
		bodyEn: v.string(),
		imageStorageId: v.optional(v.id('_storage')),
		pinned: v.boolean()
	},
	handler: async (ctx, args) => {
		await requireOwner(ctx);
		return ctx.db.insert('news', { ...args, publishedAt: Date.now() });
	}
});

export const update = mutation({
	args: {
		id: v.id('news'),
		patch: v.object({
			titleSv: v.optional(v.string()),
			titleEn: v.optional(v.string()),
			bodySv: v.optional(v.string()),
			bodyEn: v.optional(v.string()),
			imageStorageId: v.optional(v.id('_storage')),
			pinned: v.optional(v.boolean())
		})
	},
	handler: async (ctx, { id, patch }) => {
		await requireOwner(ctx);
		await ctx.db.patch(id, patch);
	}
});

export const remove = mutation({
	args: { id: v.id('news') },
	handler: async (ctx, { id }) => {
		await requireOwner(ctx);
		const item = await ctx.db.get(id);
		if (item?.imageStorageId) await ctx.storage.delete(item.imageStorageId);
		await ctx.db.delete(id);
	}
});
