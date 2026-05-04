<script lang="ts">
	import { Star } from 'lucide-svelte';
	import type { Lang } from '$lib/i18n';
	import { makeT } from '$lib/i18n';

	export let lang: Lang;
	export let rating: number;
	export let totalRatings: number;
	export let reviews: {
		authorName: string;
		rating: number;
		text: string;
		relativeTime: string;
		profilePhotoUrl?: string;
	}[];

	const m = makeT(lang);
</script>

<section class="mx-auto max-w-7xl px-6 py-20">
	<header class="mb-10 flex flex-col items-center text-center">
		<h2 class="font-display text-3xl md:text-4xl">{m('section_reviews')}</h2>
		<div class="mt-3 flex items-center gap-2">
			<div class="flex">
				{#each Array(5) as _, i}
					<Star
						class="h-5 w-5 {i < Math.round(rating) ? 'fill-berry text-berry' : 'text-cream-200'}"
					/>
				{/each}
			</div>
			<span class="font-medium">{rating.toFixed(1)}</span>
			<span class="text-sm text-cocoa-500">· {totalRatings} {m('reviews_loaded_from_google')}</span>
		</div>
	</header>

	<div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
		{#each reviews.slice(0, 6) as r (r.authorName + r.relativeTime)}
			<article class="card flex h-full flex-col gap-3 p-6">
				<div class="flex">
					{#each Array(5) as _, i}
						<Star class="h-4 w-4 {i < r.rating ? 'fill-berry text-berry' : 'text-cream-200'}" />
					{/each}
				</div>
				<p class="flex-1 text-sm leading-relaxed text-cocoa-700">"{r.text}"</p>
				<footer class="flex items-center gap-3 border-t border-cream-200 pt-3">
					{#if r.profilePhotoUrl}
						<img
							src={r.profilePhotoUrl}
							alt=""
							class="h-9 w-9 rounded-full object-cover"
							loading="lazy"
						/>
					{:else}
						<div
							class="flex h-9 w-9 items-center justify-center rounded-full bg-cream-200 font-display text-sm font-semibold"
						>
							{r.authorName.charAt(0)}
						</div>
					{/if}
					<div>
						<div class="text-sm font-medium">{r.authorName}</div>
						<div class="text-xs text-cocoa-500">{r.relativeTime}</div>
					</div>
				</footer>
			</article>
		{/each}
	</div>
</section>
