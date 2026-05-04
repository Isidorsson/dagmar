<script lang="ts">
	import type { Lang } from '$lib/i18n';
	import { makeT } from '$lib/i18n';
	import AllergenBadges from './AllergenBadges.svelte';

	export let cake: {
		_id: string;
		slug: string;
		nameSv: string;
		nameEn: string;
		descSv: string;
		descEn: string;
		priceFrom?: number;
		imageUrl: string | null;
		dietary: ('glutenfri' | 'laktosfri' | 'vegan' | 'notfri')[];
	};
	export let lang: Lang;
	const m = makeT(lang);
	$: name = lang === 'sv' ? cake.nameSv : cake.nameEn;
	$: desc = lang === 'sv' ? cake.descSv : cake.descEn;
</script>

<a
	href="/tartor/{cake.slug}"
	class="card group block transition hover:-translate-y-1 hover:shadow-[0_4px_8px_rgb(58_36_24/0.08),0_24px_48px_-16px_rgb(58_36_24/0.24)]"
>
	<div class="aspect-[4/3] overflow-hidden bg-cream-200">
		{#if cake.imageUrl}
			<img
				src={cake.imageUrl}
				alt={name}
				class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
				loading="lazy"
			/>
		{/if}
	</div>
	<div class="space-y-2 p-5">
		<div class="flex items-start justify-between gap-3">
			<h3 class="font-display text-lg font-semibold leading-tight">{name}</h3>
			{#if cake.priceFrom}
				<span class="shrink-0 text-sm font-medium text-berry">{m('price_from', { price: cake.priceFrom })}</span>
			{/if}
		</div>
		<p class="line-clamp-2 text-sm text-cocoa-500">{desc}</p>
		{#if cake.dietary.length}
			<AllergenBadges {lang} dietary={cake.dietary} />
		{/if}
	</div>
</a>
