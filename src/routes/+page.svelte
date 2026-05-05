<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import ReviewCarousel from '$lib/components/ReviewCarousel.svelte';
	import NewsBanner from '$lib/components/NewsBanner.svelte';
	import { makeT } from '$lib/i18n';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);

	const typeBoxes = [
		{
			slug: 'tartor',
			key: 'producttype_tarta' as const,
			img: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&q=80'
		},
		{
			slug: 'brod',
			key: 'producttype_brod' as const,
			img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80'
		},
		{
			slug: 'bakverk',
			key: 'producttype_bakverk' as const,
			img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&q=80'
		}
	];
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
		<a href="/sortiment" class="btn-ghost text-sm">{m('assortment_title')} →</a>
	</header>
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.featured as product (product._id)}
			<ProductCard {product} {lang} />
		{/each}
	</div>
</section>

<section class="border-y border-cream-200 bg-cream-50">
	<div class="mx-auto grid max-w-7xl gap-6 px-6 py-20 md:grid-cols-3">
		{#each typeBoxes as box (box.slug)}
			<a
				href="/sortiment/{box.slug}"
				class="group relative aspect-[4/3] overflow-hidden rounded-card bg-cocoa shadow-card"
			>
				<img
					src={box.img}
					alt=""
					class="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
				/>
				<div
					class="absolute inset-0"
					style="background: linear-gradient(180deg, transparent 40%, rgba(58,36,24,0.85) 100%)"
				></div>
				<div class="absolute inset-x-0 bottom-0 p-6 text-cream">
					<h3 class="font-display text-2xl">{m(box.key)}</h3>
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
