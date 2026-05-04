<script lang="ts">
	import CakeCard from '$lib/components/CakeCard.svelte';
	import { makeT } from '$lib/i18n';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);

	const cats = [
		{ slug: '', key: 'all_cakes' as const },
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

	function chipHref(params: Record<string, string | null>) {
		const url = new URL('/tartor', 'http://x');
		for (const [k, v] of Object.entries(params)) if (v) url.searchParams.set(k, v);
		return url.pathname + url.search;
	}
</script>

<svelte:head>
	<title>{m('all_cakes')} — {m('site_name')}</title>
</svelte:head>

<section class="mx-auto max-w-7xl px-6 py-16">
	<h1 class="font-display text-4xl md:text-5xl">{m('all_cakes')}</h1>

	<div class="mt-8 flex flex-wrap gap-2">
		{#each cats as cat (cat.slug)}
			<a
				href={chipHref({ cat: cat.slug || null, diet: data.activeDiet })}
				class="tag transition hover:bg-cream-200"
				class:bg-cocoa={(data.activeCategory ?? '') === cat.slug}
				class:text-cream={(data.activeCategory ?? '') === cat.slug}
			>{m(cat.key)}</a>
		{/each}
		<span class="mx-2 self-center text-cocoa-500">·</span>
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
		{#each data.cakes as cake (cake._id)}
			<CakeCard {cake} {lang} />
		{:else}
			<p class="text-cocoa-500">—</p>
		{/each}
	</div>
</section>
