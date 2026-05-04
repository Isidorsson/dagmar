import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { authMode, isAuthed } from '$lib/server/auth';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const authed = isAuthed(cookies);
	if (!authed && url.pathname !== '/admin/login') {
		redirect(303, `/admin/login?next=${encodeURIComponent(url.pathname)}`);
	}
	return { authed, authMode };
};
