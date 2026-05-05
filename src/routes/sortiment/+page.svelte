<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { makeT } from '$lib/i18n';
	import { PRODUCT_TYPES, slugForType, i18nKeyForType } from '$lib/productTypes';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);

	const diets = [
		{ slug: 'glutenfri', key: 'diet_glutenfri' as const },
		{ slug: 'laktosfri', key: 'diet_laktosfri' as const },
		{ slug: 'vegan', key: 'diet_vegan' as const },
		{ slug: 'notfri', key: 'diet_notfri' as const }
	];

	function dietHref(slug: string | null) {
		const url = new URL('/sortiment', 'http://x');
		if (slug) url.searchParams.set('diet', slug);
		return url.pathname + url.search;
	}
</script>

<svelte:head>
	<title>{m('assortment_title')} — {m('site_name')}</title>
	<meta name="description" content={m('assortment_intro')} />
</svelte:head>

<section class="mx-auto max-w-7xl px-6 py-16">
	<h1 class="font-display text-4xl md:text-5xl">{m('assortment_title')}</h1>
	<p class="mt-4 max-w-2xl text-cocoa-700">{m('assortment_intro')}</p>

	<nav class="mt-8 flex flex-wrap gap-2" aria-label={m('assortment_title')}>
		<a href="/sortiment" class="tag bg-cocoa text-cream">{m('producttype_all')}</a>
		{#each PRODUCT_TYPES as type (type)}
			<a href="/sortiment/{slugForType(type)}" class="tag transition hover:bg-cream-200">
				{m(i18nKeyForType(type))}
			</a>
		{/each}
	</nav>

	<div class="mt-6 flex flex-wrap gap-2">
		{#each diets as d (d.slug)}
			<a
				href={dietHref(data.activeDiet === d.slug ? null : d.slug)}
				class="tag transition hover:bg-cream-200"
				class:bg-leaf={data.activeDiet === d.slug}
				class:text-cream={data.activeDiet === d.slug}
			>{m(d.key)}</a>
		{/each}
	</div>

	<div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.products as product (product._id)}
			<ProductCard {product} {lang} />
		{:else}
			<p class="text-cocoa-500">—</p>
		{/each}
	</div>
</section>
