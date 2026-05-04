<script lang="ts">
	import { makeT } from '$lib/i18n';
	export let data;
	export let form;
	$: lang = data.lang;
	$: m = makeT(lang);
	$: cfg = data.cfg;
</script>

<svelte:head>
	<title>{m('admin_settings')}</title>
</svelte:head>

<h1 class="font-display text-3xl">{m('admin_settings')}</h1>

{#if form?.ok}
	<p class="mt-3 inline-flex rounded-full bg-leaf/15 px-3 py-1 text-sm text-leaf">✓ {m('admin_save')}d</p>
{/if}

<form method="POST" class="card mt-6 grid gap-4 p-6 md:grid-cols-2">
	<label class="block md:col-span-2">
		<span class="text-xs font-medium uppercase text-cocoa-500">Google Place ID</span>
		<input name="googlePlaceId" value={cfg.googlePlaceId} class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
		<span class="mt-1 block text-xs text-cocoa-500">{lang === 'sv' ? 'Hittas via Google "Place ID Finder"' : 'Find via Google "Place ID Finder"'}</span>
	</label>
	<label class="block">
		<span class="text-xs font-medium uppercase text-cocoa-500">Instagram</span>
		<input name="instagramHandle" value={cfg.instagramHandle} class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
	</label>
	<label class="block">
		<span class="text-xs font-medium uppercase text-cocoa-500">{m('phone_label')}</span>
		<input name="contactPhone" value={cfg.contactPhone} class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
	</label>
	<label class="block">
		<span class="text-xs font-medium uppercase text-cocoa-500">{m('email_label')}</span>
		<input name="contactEmail" type="email" value={cfg.contactEmail} class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
	</label>
	<label class="block md:col-span-2">
		<span class="text-xs font-medium uppercase text-cocoa-500">{m('address_label')}</span>
		<input name="address" value={cfg.address} class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
	</label>
	<label class="block md:col-span-2">
		<span class="text-xs font-medium uppercase text-cocoa-500">Map embed URL</span>
		<input name="mapEmbedUrl" value={cfg.mapEmbedUrl} class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
	</label>
	<button class="btn-primary md:col-span-2" type="submit">{m('admin_save')}</button>
</form>
