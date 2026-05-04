<script lang="ts">
	import HoursWidget from '$lib/components/HoursWidget.svelte';
	import { CalendarDays } from 'lucide-svelte';
	import { makeT } from '$lib/i18n';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);
</script>

<svelte:head>
	<title>{m('hours_label')} — {m('site_name')}</title>
</svelte:head>

<section class="mx-auto max-w-3xl px-6 py-16">
	<h1 class="font-display text-4xl md:text-5xl">{m('hours_label')}</h1>

	<div class="mt-10">
		<HoursWidget {lang} hours={data.hours} />
	</div>

	{#if data.holidays.length}
		<section class="mt-12">
			<h2 class="mb-4 flex items-center gap-2 font-display text-2xl">
				<CalendarDays class="h-5 w-5 text-berry" />
				{m('upcoming_holidays')}
			</h2>
			<ul class="card divide-y divide-cream-200">
				{#each data.holidays as h (h._id)}
					<li class="flex items-baseline justify-between gap-4 px-5 py-3">
						<div>
							<div class="font-medium">{lang === 'sv' ? h.labelSv : h.labelEn}</div>
							<div class="text-sm text-cocoa-500">{h.date}</div>
						</div>
						<div class="text-sm">
							{#if h.closed}
								<span class="text-berry">{m('closed_today')}</span>
							{:else}
								{h.openTime}–{h.closeTime}
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</section>
