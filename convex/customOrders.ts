import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { orderStatus } from './schema';
import { requireOwner } from './_lib/auth';

export const create = mutation({
	args: {
		customerName: v.string(),
		email: v.string(),
		phone: v.string(),
		desiredDate: v.string(),
		occasion: v.string(),
		designNotes: v.string(),
		referenceImageId: v.optional(v.id('_storage')),
		allergens: v.string(),
		servings: v.number()
	},
	handler: async (ctx, args) => {
		if (args.designNotes.length > 4000) throw new Error('Description too long');
		if (args.servings < 1 || args.servings > 200) throw new Error('Invalid serving count');
		return ctx.db.insert('customOrders', {
			...args,
			status: 'new',
			createdAt: Date.now()
		});
	}
});

export const list = query({
	args: { status: v.optional(orderStatus) },
	handler: async (ctx, { status }) => {
		await requireOwner(ctx);
		const orders = status
			? await ctx.db
					.query('customOrders')
					.withIndex('by_status', (q) => q.eq('status', status))
					.order('desc')
					.collect()
			: await ctx.db.query('customOrders').order('desc').collect();
		return Promise.all(
			orders.map(async (o) => ({
				...o,
				referenceImageUrl: o.referenceImageId ? await ctx.storage.getUrl(o.referenceImageId) : null
			}))
		);
	}
});

export const newCount = query({
	args: {},
	handler: async (ctx) => {
		await requireOwner(ctx);
		const items = await ctx.db
			.query('customOrders')
			.withIndex('by_status', (q) => q.eq('status', 'new'))
			.collect();
		return items.length;
	}
});

export const updateStatus = mutation({
	args: { id: v.id('customOrders'), status: orderStatus },
	handler: async (ctx, { id, status }) => {
		await requireOwner(ctx);
		await ctx.db.patch(id, { status });
	}
});
