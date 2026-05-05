<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { makeT } from '$lib/i18n';
	import { PRODUCT_TYPES, slugForType, i18nKeyForType } from '$lib/productTypes';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);

	const cakeCats = [
		{ slug: '', key: 'producttype_tarta' as const },
		{ slug: 'ordinarie', key: 'category_ordinarie' as const },
		{ slug: 'specialtarta', key: 'category_specialtarta' as const },
		{ slug: 'eget-motiv', key: 'category_eget_motiv' as const }
	];

	const diets = [
		{ slug: 'glutenfri', key: 'diet_glutenfri' as const },
		{ slug: 'laktosfri', key: 'diet_laktosfri' as const },
		{ slug: 'vegan', key: 'diet_vegan' as const },
		{ slug: 'notfri', key: 'diet_notfri' as const }
	];

	$: typeHref = `/sortiment/${data.typeSlug}`;

	function chipHref(params: Record<string, string | null>) {
		const url = new URL(typeHref, 'http://x');
		for (const [k, v] of Object.entries(params)) if (v) url.searchParams.set(k, v);
		return url.pathname + url.search;
	}

	$: title = m(i18nKeyForType(data.productType));
</script>

<svelte:head>
	<title>{title} — {m('site_name')}</title>
</svelte:head>

<section class="mx-auto max-w-7xl px-6 py-16">
	<h1 class="font-display text-4xl md:text-5xl">{title}</h1>

	<nav class="mt-8 flex flex-wrap gap-2" aria-label={m('assortment_title')}>
		<a href="/sortiment" class="tag transition hover:bg-cream-200">{m('producttype_all')}</a>
		{#each PRODUCT_TYPES as type (type)}
			<a
				href="/sortiment/{slugForType(type)}"
				class="tag transition hover:bg-cream-200"
				class:bg-cocoa={data.productType === type}
				class:text-cream={data.productType === type}
			>{m(i18nKeyForType(type))}</a>
		{/each}
	</nav>

	{#if data.productType === 'tarta'}
		<div class="mt-6 flex flex-wrap gap-2">
			{#each cakeCats as cat (cat.slug)}
				<a
					href={chipHref({ cat: cat.slug || null, diet: data.activeDiet })}
					class="tag transition hover:bg-cream-200"
					class:bg-cocoa={(data.activeCategory ?? '') === cat.slug}
					class:text-cream={(data.activeCategory ?? '') === cat.slug}
				>{m(cat.key)}</a>
			{/each}
		</div>
	{/if}

	<div class="mt-4 flex flex-wrap gap-2">
		{#each diets as d (d.slug)}
			<a
				href={chipHref({ cat: data.activeCategory, diet: data.activeDiet === d.slug ? null : d.slug })}
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
