<script lang="ts">
	import type { Lang } from '$lib/i18n';
	import { makeT } from '$lib/i18n';
	import HoursWidget from './HoursWidget.svelte';

	export let lang: Lang;
	export let hours: { weekday: number; openTime: string; closeTime: string; closed: boolean }[];

	const m = makeT(lang);
</script>

<section
	class="relative isolate overflow-hidden bg-cocoa text-cream"
	style="background-image: radial-gradient(1200px 600px at 80% -10%, rgba(168,50,74,0.35), transparent), radial-gradient(800px 400px at 0% 100%, rgba(110,127,74,0.25), transparent);"
>
	<div class="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
		<div class="flex flex-col justify-center">
			<span class="mb-3 text-xs uppercase tracking-[0.2em] text-cream-200">{m('hero_eyebrow')}</span>
			<h1 class="font-display text-4xl leading-[1.05] md:text-6xl">{m('hero_title')}</h1>
			<p class="mt-5 max-w-md text-lg text-cream/80">{m('hero_subtitle')}</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<a href="/bestall" class="btn-accent">{m('hero_cta_order')}</a>
				<a
					href="/sortiment"
					class="btn border border-cream/20 bg-transparent text-cream hover:bg-cream/10"
				>
					{m('hero_cta_browse')}
				</a>
			</div>
			<div class="mt-8">
				<HoursWidget {lang} {hours} compact />
			</div>
		</div>
		<div class="relative hidden md:block">
			<div
				class="absolute inset-0 -rotate-2 rounded-[2rem] bg-cream/10 backdrop-blur-sm"
				aria-hidden="true"
			></div>
			<img
				src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=1200&q=80"
				alt=""
				class="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl"
			/>
		</div>
	</div>
</section>
