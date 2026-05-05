<script lang="ts">
	import type { Lang } from '$lib/i18n';
	import { makeT } from '$lib/i18n';
	import AllergenBadges from './AllergenBadges.svelte';

	export let product: {
		_id: string;
		slug: string;
		nameSv: string;
		nameEn: string;
		descSv: string;
		descEn: string;
		priceFrom?: number;
		unitSv?: string;
		unitEn?: string;
		weightGrams?: number;
		stockCount?: number;
		imageUrl: string | null;
		dietary: ('glutenfri' | 'laktosfri' | 'vegan' | 'notfri')[];
	};
	export let lang: Lang;
	const m = makeT(lang);
	$: name = lang === 'sv' ? product.nameSv : product.nameEn;
	$: desc = lang === 'sv' ? product.descSv : product.descEn;
	$: unit = lang === 'sv' ? product.unitSv : product.unitEn;
	$: outOfStock = product.stockCount === 0;
</script>

<a
	href="/sortiment/{product.slug}"
	class="card group block transition hover:-translate-y-1 hover:shadow-[0_4px_8px_rgb(58_36_24/0.08),0_24px_48px_-16px_rgb(58_36_24/0.24)]"
>
	<div class="relative aspect-[4/3] overflow-hidden bg-cream-200">
		{#if product.imageUrl}
			<img
				src={product.imageUrl}
				alt={name}
				class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
				loading="lazy"
			/>
		{/if}
		{#if outOfStock}
			<span class="absolute right-3 top-3 rounded-full bg-berry px-3 py-1 text-xs font-semibold text-cream">
				{m('stock_out')}
			</span>
		{/if}
	</div>
	<div class="space-y-2 p-5">
		<div class="flex items-start justify-between gap-3">
			<h3 class="font-display text-lg font-semibold leading-tight">{name}</h3>
			{#if product.priceFrom}
				<span class="shrink-0 text-sm font-medium text-berry">{m('price_from', { price: product.priceFrom })}</span>
			{/if}
		</div>
		{#if unit}
			<p class="text-xs text-cocoa-500">{unit}</p>
		{/if}
		<p class="line-clamp-2 text-sm text-cocoa-500">{desc}</p>
		{#if product.dietary.length}
			<AllergenBadges {lang} dietary={product.dietary} />
		{/if}
	</div>
</a>
