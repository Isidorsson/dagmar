import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { authMode, isAuthed, tryDemoLogin, logout } from '$lib/server/auth';

export const load: PageServerLoad = async ({ cookies, url }) => {
	if (authMode === 'bypass' || isAuthed(cookies)) {
		redirect(303, url.searchParams.get('next') ?? '/admin');
	}
	return { next: url.searchParams.get('next') ?? '/admin' };
};

export const actions: Actions = {
	default: async ({ request, cookies, url }) => {
		try {
			const form = await request.formData();
			const password = String(form.get('password') ?? '');
			if (!tryDemoLogin(cookies, password)) {
				return fail(401, { error: 'Wrong password' });
			}
		} catch (err) {
			console.error('[admin/login] action error:', err);
			return fail(500, { error: String(err) });
		}
		redirect(303, url.searchParams.get('next') ?? '/admin');
	},
	logout: async ({ cookies }) => {
		logout(cookies);
		redirect(303, '/admin/login');
	}
};
