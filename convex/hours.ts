import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { requireOwner } from './_lib/auth';

export const all = query({
	args: {},
	handler: async (ctx) => {
		const rows = await ctx.db.query('hours').collect();
		return rows.sort((a, b) => a.weekday - b.weekday);
	}
});

export const upsert = mutation({
	args: {
		weekday: v.number(),
		openTime: v.string(),
		closeTime: v.string(),
		closed: v.boolean()
	},
	handler: async (ctx, args) => {
		await requireOwner(ctx);
		const existing = await ctx.db
			.query('hours')
			.withIndex('by_weekday', (q) => q.eq('weekday', args.weekday))
			.unique();
		if (existing) {
			await ctx.db.patch(existing._id, args);
		} else {
			await ctx.db.insert('hours', args);
		}
	}
});
