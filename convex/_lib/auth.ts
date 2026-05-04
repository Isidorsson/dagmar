import type { QueryCtx, MutationCtx } from '../_generated/server';

export async function requireOwner(ctx: QueryCtx | MutationCtx) {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) throw new Error('Not authenticated');
	const ownerId = process.env.OWNER_CLERK_USER_ID;
	if (!ownerId) throw new Error('OWNER_CLERK_USER_ID not configured');
	if (identity.subject !== ownerId) throw new Error('Not authorized');
	return identity;
}
