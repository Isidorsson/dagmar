<script lang="ts">
	import { Lock } from 'lucide-svelte';
	import { makeT } from '$lib/i18n';

	export let data;
	export let form;
	$: lang = data.lang;
	$: m = makeT(lang);
</script>

<svelte:head>
	<title>{m('admin_login')}</title>
</svelte:head>

<section class="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-6 py-16">
	<div class="card p-8">
		<div class="mb-6 flex items-center gap-3">
			<div class="flex h-10 w-10 items-center justify-center rounded-full bg-cocoa text-cream">
				<Lock class="h-4 w-4" />
			</div>
			<div>
				<h1 class="font-display text-2xl">{m('admin_login')}</h1>
				<p class="text-sm text-cocoa-500">{lang === 'sv' ? 'Endast bagaren' : 'Owner only'}</p>
			</div>
		</div>
		<form method="POST" class="space-y-4">
			<label class="block">
				<span class="text-sm font-medium">{lang === 'sv' ? 'Lösenord' : 'Password'}</span>
				<input
					name="password"
					type="password"
					required
					autocomplete="current-password"
					class="mt-1.5 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm focus:border-cocoa focus:outline-none"
				/>
			</label>
			{#if form?.error}
				<p class="text-sm text-berry">{form.error}</p>
			{/if}
			<button class="btn-primary w-full">{m('admin_login')}</button>
		</form>
		<p class="mt-6 text-xs text-cocoa-500">
			{lang === 'sv'
				? 'Demo-lösenord: lorem2026 (byt eller koppla på Clerk i produktion).'
				: 'Demo password: lorem2026 (change or wire up Clerk in production).'}
		</p>
	</div>
</section>
