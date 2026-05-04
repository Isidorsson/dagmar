<script lang="ts">
	import AllergenBadges from '$lib/components/AllergenBadges.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import { makeT } from '$lib/i18n';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);
	$: cake = data.cake;
	$: name = lang === 'sv' ? cake.nameSv : cake.nameEn;
	$: desc = lang === 'sv' ? cake.descSv : cake.descEn;
</script>

<svelte:head>
	<title>{name} — {m('site_name')}</title>
	<meta name="description" content={desc} />
</svelte:head>

<article class="mx-auto max-w-5xl px-6 py-12">
	<a href="/tartor" class="btn-ghost mb-6 -ml-3">
		<ArrowLeft class="h-4 w-4" /> {m('all_cakes')}
	</a>

	<div class="grid gap-10 md:grid-cols-2">
		<div class="aspect-[4/3] overflow-hidden rounded-card bg-cream-200 shadow-card">
			{#if cake.imageUrl}
				<img src={cake.imageUrl} alt={name} class="h-full w-full object-cover" />
			{/if}
		</div>
		<div>
			<h1 class="font-display text-4xl md:text-5xl">{name}</h1>
			{#if cake.priceFrom}
				<p class="mt-3 text-xl font-semibold text-berry">{m('price_from', { price: cake.priceFrom })}</p>
			{/if}
			<p class="mt-6 text-lg leading-relaxed text-cocoa-700">{desc}</p>

			{#if cake.dietary.length}
				<div class="mt-6"><AllergenBadges {lang} dietary={cake.dietary} /></div>
			{/if}

			{#if cake.allergens.length}
				<div class="mt-6">
					<h2 class="text-sm font-semibold uppercase tracking-wide text-cocoa-500">
						{lang === 'sv' ? 'Innehåller' : 'Contains'}
					</h2>
					<p class="mt-2 text-sm text-cocoa-700">{cake.allergens.join(', ')}</p>
				</div>
			{/if}

			<div class="mt-10 flex gap-3">
				<a href="/bestall?cake={cake.slug}" class="btn-accent">{m('hero_cta_order')}</a>
				<a href="/kontakt" class="btn-ghost">{m('nav_contact')}</a>
			</div>
		</div>
	</div>
</article>
