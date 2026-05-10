/**
 * Admin auth.
 *
 * Three modes, picked automatically by env:
 *
 * 1. DEMO BYPASS (default — no env set):
 *    Admin pages are viewable by anyone. No login. Shows a banner. Forms still mutate
 *    the in-memory store but data resets on server restart. Lets you preview the whole
 *    admin UI without configuring anything.
 *
 * 2. DEMO PASSWORD (set OWNER_DEMO_PASSWORD):
 *    Single shared password protects /admin. Cookie-based session. Good for staging
 *    or hand-off to the bakery owner with a temporary password.
 *
 * 3. LIVE (set PUBLIC_CLERK_PUBLISHABLE_KEY):
 *    Replace this file's checks with @clerk/clerk-sveltekit session helpers. See README.
 */

import type { Cookies } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { isLiveAuth } from './source';

const COOKIE_NAME = 'lorem_admin';
const DEMO_PASSWORD = env.OWNER_DEMO_PASSWORD;

export const authMode: 'live' | 'password' | 'bypass' = isLiveAuth
	? 'live'
	: DEMO_PASSWORD
		? 'password'
		: 'bypass';

export const isDemoAuth = authMode !== 'live';

export function isAuthed(cookies: Cookies): boolean {
	if (authMode === 'bypass') return true;
	if (authMode === 'live') return Boolean(cookies.get('__session'));
	return cookies.get(COOKIE_NAME) === 'ok';
}

export function tryDemoLogin(cookies: Cookies, password: string) {
	if (authMode === 'bypass') return true;
	if (DEMO_PASSWORD && password === DEMO_PASSWORD) {
		cookies.set(COOKIE_NAME, 'ok', {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 60 * 60 * 24 * 30
		});
		return true;
	}
	return false;
}

export function logout(cookies: Cookies) {
	cookies.delete(COOKIE_NAME, { path: '/' });
}
