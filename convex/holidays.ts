import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { requireOwner } from './_lib/auth';

export const upcoming = query({
	args: { fromDate: v.string() },
	handler: async (ctx, { fromDate }) => {
		const all = await ctx.db.query('holidays').collect();
		return all.filter((h) => h.date >= fromDate).sort((a, b) => a.date.localeCompare(b.date));
	}
});

export const all = query({
	args: {},
	handler: async (ctx) => {
		const rows = await ctx.db.query('holidays').collect();
		return rows.sort((a, b) => a.date.localeCompare(b.date));
	}
});

export const create = mutation({
	args: {
		date: v.string(),
		labelSv: v.string(),
		labelEn: v.string(),
		closed: v.boolean(),
		openTime: v.optional(v.string()),
		closeTime: v.optional(v.string())
	},
	handler: async (ctx, args) => {
		await requireOwner(ctx);
		return ctx.db.insert('holidays', args);
	}
});

export const remove = mutation({
	args: { id: v.id('holidays') },
	handler: async (ctx, { id }) => {
		await requireOwner(ctx);
		await ctx.db.delete(id);
	}
});
