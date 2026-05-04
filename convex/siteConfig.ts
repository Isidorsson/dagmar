import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { requireOwner } from './_lib/auth';

export const get = query({
	args: {},
	handler: async (ctx) => {
		const row = await ctx.db
			.query('siteConfig')
			.withIndex('by_key', (q) => q.eq('key', 'singleton'))
			.unique();
		return row;
	}
});

export const upsert = mutation({
	args: {
		googlePlaceId: v.string(),
		instagramHandle: v.string(),
		contactPhone: v.string(),
		contactEmail: v.string(),
		address: v.string(),
		mapEmbedUrl: v.string()
	},
	handler: async (ctx, args) => {
		await requireOwner(ctx);
		const existing = await ctx.db
			.query('siteConfig')
			.withIndex('by_key', (q) => q.eq('key', 'singleton'))
			.unique();
		if (existing) {
			await ctx.db.patch(existing._id, args);
		} else {
			await ctx.db.insert('siteConfig', { key: 'singleton', ...args });
		}
	}
});
