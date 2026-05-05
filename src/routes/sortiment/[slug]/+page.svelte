<script lang="ts">
	import AllergenBadges from '$lib/components/AllergenBadges.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import { makeT } from '$lib/i18n';
	import { slugForType, i18nKeyForType } from '$lib/productTypes';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);
	$: product = data.product;
	$: name = lang === 'sv' ? product.nameSv : product.nameEn;
	$: desc = lang === 'sv' ? product.descSv : product.descEn;
	$: unit = lang === 'sv' ? product.unitSv : product.unitEn;
	$: typeHref = `/sortiment/${slugForType(product.productType)}`;
	$: typeLabel = m(i18nKeyForType(product.productType));
</script>

<svelte:head>
	<title>{name} — {m('site_name')}</title>
	<meta name="description" content={desc} />
</svelte:head>

<article class="mx-auto max-w-5xl px-6 py-12">
	<a href={typeHref} class="btn-ghost mb-6 -ml-3">
		<ArrowLeft class="h-4 w-4" /> {typeLabel}
	</a>

	<div class="grid gap-10 md:grid-cols-2">
		<div class="aspect-[4/3] overflow-hidden rounded-card bg-cream-200 shadow-card">
			{#if product.imageUrl}
				<img src={product.imageUrl} alt={name} class="h-full w-full object-cover" />
			{/if}
		</div>
		<div>
			<p class="text-sm uppercase tracking-wide text-cocoa-500">{typeLabel}</p>
			<h1 class="mt-1 font-display text-4xl md:text-5xl">{name}</h1>

			{#if product.priceFrom}
				<p class="mt-3 text-xl font-semibold text-berry">{m('price_from', { price: product.priceFrom })}</p>
			{/if}

			{#if unit || product.weightGrams}
				<dl class="mt-4 space-y-1 text-sm text-cocoa-700">
					{#if unit}
						<div class="flex gap-2"><dt class="font-semibold">{m('unit_label')}:</dt><dd>{unit}</dd></div>
					{/if}
					{#if product.weightGrams}
						<div class="flex gap-2"><dt class="font-semibold">{m('weight_label')}:</dt><dd>{product.weightGrams} g</dd></div>
					{/if}
				</dl>
			{/if}

			{#if product.stockCount !== undefined && product.stockCount !== null}
				<p
					class="mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold"
					class:bg-leaf={product.stockCount > 5}
					class:text-cream={product.stockCount > 5 || product.stockCount === 0}
					class:bg-amber-200={product.stockCount > 0 && product.stockCount <= 5}
					class:text-cocoa={product.stockCount > 0 && product.stockCount <= 5}
					class:bg-berry={product.stockCount === 0}
				>
					{#if product.stockCount === 0}
						{m('stock_out')}
					{:else if product.stockCount <= 5}
						{m('stock_low', { count: product.stockCount })}
					{:else}
						{m('stock_in', { count: product.stockCount })}
					{/if}
				</p>
			{/if}

			<p class="mt-6 text-lg leading-relaxed text-cocoa-700">{desc}</p>

			{#if product.dietary.length}
				<div class="mt-6"><AllergenBadges {lang} dietary={product.dietary} /></div>
			{/if}

			{#if product.allergens.length}
				<div class="mt-6">
					<h2 class="text-sm font-semibold uppercase tracking-wide text-cocoa-500">
						{lang === 'sv' ? 'Innehåller' : 'Contains'}
					</h2>
					<p class="mt-2 text-sm text-cocoa-700">{product.allergens.join(', ')}</p>
				</div>
			{/if}

			<div class="mt-10 flex gap-3">
				{#if product.productType === 'tarta'}
					<a href="/bestall?cake={product.slug}" class="btn-accent">{m('hero_cta_order')}</a>
				{/if}
				<a href="/kontakt" class="btn-ghost">{m('nav_contact')}</a>
			</div>
		</div>
	</div>
</article>
