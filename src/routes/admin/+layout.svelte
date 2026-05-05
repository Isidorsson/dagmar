<script lang="ts">
	import { page } from '$app/stores';
	import { Cake, ClipboardList, Clock, Newspaper, Settings, LogOut } from 'lucide-svelte';
	import { makeT } from '$lib/i18n';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);

	const items = [
		{ href: '/admin', label: 'admin_dashboard' as const, icon: ClipboardList },
		{ href: '/admin/sortiment', label: 'admin_products' as const, icon: Cake },
		{ href: '/admin/bestallningar', label: 'admin_orders' as const, icon: ClipboardList },
		{ href: '/admin/oppettider', label: 'admin_hours' as const, icon: Clock },
		{ href: '/admin/nyheter', label: 'admin_news' as const, icon: Newspaper },
		{ href: '/admin/installningar', label: 'admin_settings' as const, icon: Settings }
	];

	$: isLoginPage = $page.url.pathname === '/admin/login';
</script>

{#if isLoginPage}
	<slot />
{:else}
	<div class="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[220px_1fr]">
		<aside class="md:sticky md:top-20 md:self-start">
			{#if data.authMode === 'bypass'}
				<div class="mb-4 rounded-lg border border-berry/30 bg-berry/10 p-3 text-xs leading-relaxed text-berry">
					<strong>DEMO BYPASS</strong> · auth disabled. Set
					<code class="rounded bg-cream-200 px-1">OWNER_DEMO_PASSWORD</code>
					or
					<code class="rounded bg-cream-200 px-1">PUBLIC_CLERK_PUBLISHABLE_KEY</code>
					in <code class="rounded bg-cream-200 px-1">.env</code> to enable real auth.
				</div>
			{:else if data.authMode === 'password'}
				<div class="mb-4 rounded-lg border border-berry/30 bg-berry/10 p-3 text-xs text-berry">
					<strong>STAGING</strong> · password auth · swap to Clerk for prod.
				</div>
			{/if}
			<nav class="card flex flex-col gap-0.5 p-2 text-sm">
				{#each items as item (item.href)}
					{@const active = $page.url.pathname === item.href}
					<a
						href={item.href}
						class="flex items-center gap-2.5 rounded-lg px-3 py-2 transition"
						class:bg-cocoa={active}
						class:text-cream={active}
						class:hover:bg-cream-200={!active}
					>
						<svelte:component this={item.icon} class="h-4 w-4" />
						{m(item.label)}
					</a>
				{/each}
				<form method="POST" action="/admin/login?/logout" class="mt-2 border-t border-cream-200 pt-2">
					<button class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-cocoa-500 transition hover:bg-cream-200">
						<LogOut class="h-4 w-4" /> {lang === 'sv' ? 'Logga ut' : 'Sign out'}
					</button>
				</form>
			</nav>
		</aside>
		<div class="min-w-0">
			<slot />
		</div>
	</div>
{/if}
