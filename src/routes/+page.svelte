<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import CakeCard from '$lib/components/CakeCard.svelte';
	import ReviewCarousel from '$lib/components/ReviewCarousel.svelte';
	import NewsBanner from '$lib/components/NewsBanner.svelte';
	import { makeT } from '$lib/i18n';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);
</script>

<svelte:head>
	<title>{m('site_name')} — {m('hero_title')}</title>
	<meta name="description" content={m('hero_subtitle')} />
</svelte:head>

<NewsBanner {lang} news={data.news} />
<Hero {lang} hours={data.hours} />

<section class="mx-auto max-w-7xl px-6 py-20">
	<header class="mb-10 flex items-end justify-between gap-4">
		<h2 class="font-display text-3xl md:text-4xl">{m('section_featured')}</h2>
		<a href="/tartor" class="btn-ghost text-sm">{m('all_cakes')} →</a>
	</header>
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.featured as cake (cake._id)}
			<CakeCard {cake} {lang} />
		{/each}
	</div>
</section>

<section class="border-y border-cream-200 bg-cream-50">
	<div class="mx-auto grid max-w-7xl gap-6 px-6 py-20 md:grid-cols-3">
		{#each [{ slug: 'ordinarie', key: 'category_ordinarie' as const, img: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&q=80' }, { slug: 'specialtarta', key: 'category_specialtarta' as const, img: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80' }, { slug: 'eget-motiv', key: 'category_eget_motiv' as const, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80' }] as cat (cat.slug)}
			<a
				href="/tartor?cat={cat.slug}"
				class="group relative aspect-[4/3] overflow-hidden rounded-card bg-cocoa shadow-card"
			>
				<img
					src={cat.img}
					alt=""
					class="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
				/>
				<div
					class="absolute inset-0"
					style="background: linear-gradient(180deg, transparent 40%, rgba(58,36,24,0.85) 100%)"
				></div>
				<div class="absolute inset-x-0 bottom-0 p-6 text-cream">
					<h3 class="font-display text-2xl">{m(cat.key)}</h3>
				</div>
			</a>
		{/each}
	</div>
</section>

<ReviewCarousel
	{lang}
	rating={data.reviewsData.rating}
	totalRatings={data.reviewsData.totalRatings}
	reviews={data.reviewsData.reviews}
/>

<section class="bg-cocoa text-cream">
	<div class="mx-auto max-w-7xl px-6 py-20 text-center">
		<h2 class="font-display text-3xl md:text-4xl">{m('order_form_title')}</h2>
		<p class="mx-auto mt-4 max-w-xl text-cream/80">{m('order_form_intro')}</p>
		<a href="/bestall" class="btn-accent mt-8 inline-flex">{m('hero_cta_order')} →</a>
	</div>
</section>
