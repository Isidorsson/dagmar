<script lang="ts">
	import { Check } from 'lucide-svelte';
	import TimePicker24 from '$lib/components/TimePicker24.svelte';
	import { makeT } from '$lib/i18n';

	export let data;
	export let form;
	$: lang = data.lang;
	$: m = makeT(lang);

	const orderedWeekdays = [1, 2, 3, 4, 5, 6, 0];

	function getRow(wd: number) {
		return (
			data.hours.find((h) => h.weekday === wd) ?? {
				weekday: wd,
				openTime: '08:00',
				closeTime: '17:00',
				closed: false
			}
		);
	}

	function todayWeekday() {
		const fmt = new Intl.DateTimeFormat('en-GB', {
			timeZone: 'Europe/Stockholm',
			weekday: 'short'
		});
		const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
		return map[fmt.format(new Date())] ?? 1;
	}
	$: today = todayWeekday();

	const initial: Record<string, string> = {
		sv: 'M T O T F L S',
		en: 'M T W T F S S'
	};
	$: initialMap = initial[lang].split(' ');

	let savedWeekday: number | null = null;
	$: if (form?.ok && typeof form?.weekday === 'number') savedWeekday = form.weekday;
</script>

<svelte:head>
	<title>{m('admin_hours')}</title>
</svelte:head>

<header class="flex items-end justify-between gap-4 border-b border-cocoa/15 pb-3">
	<div>
		<h1 class="font-display text-xl leading-none">{m('admin_hours')}</h1>
		<p class="mt-1 text-[11px] uppercase tracking-[0.16em] text-cocoa-500">
			Schema · 24h · Stockholm
		</p>
	</div>
	<form method="POST" action="?/applyPreset" class="flex items-center gap-3 text-xs">
		<span class="text-cocoa-500">{lang === 'sv' ? 'Snabbval:' : 'Preset:'}</span>
		<button
			type="submit"
			name="preset"
			value="standard"
			class="preset-link"
		>{lang === 'sv' ? 'Standard' : 'Standard'}</button>
		<span class="text-cocoa/30">·</span>
		<button
			type="submit"
			name="preset"
			value="summer"
			class="preset-link"
		>{lang === 'sv' ? 'Sommar' : 'Summer'}</button>
	</form>
</header>

<ol class="mt-2 divide-y divide-cocoa/10" aria-live="polite">
	{#each orderedWeekdays as wd, idx (wd)}
		{@const h = getRow(wd)}
		{@const isToday = wd === today}
		<li class="relative">
			{#if isToday}
				<span
					class="absolute inset-y-2 left-0 w-[3px] rounded-full bg-berry"
					aria-hidden="true"
				></span>
			{/if}
			<form
				method="POST"
				action="?/save"
				class="grid grid-cols-[2.25rem_8.5rem_1fr_auto_5.25rem] items-center gap-4 py-3 pl-3 pr-1"
			>
				<input type="hidden" name="weekday" value={wd} />

				<span
					class="font-display text-2xl font-semibold text-cocoa-500"
					class:text-berry={isToday}
					aria-hidden="true"
				>
					{initialMap[idx]}
				</span>

				<div class="flex flex-col">
					<span class="text-sm font-medium tracking-tight" class:text-cocoa-500={h.closed}>
						{m(`weekday_${wd}` as 'weekday_0')}
					</span>
					<span class="text-[10px] uppercase tracking-wider text-cocoa-500">
						{#if isToday}{lang === 'sv' ? 'Idag' : 'Today'}{:else}&nbsp;{/if}
					</span>
				</div>

				<div class="flex items-baseline gap-2 text-cocoa">
					<TimePicker24 name="openTime" value={h.openTime || '08:00'} disabled={h.closed} minuteStep={5} />
					<span class="font-display text-base text-cocoa-500" aria-hidden="true">—</span>
					<TimePicker24 name="closeTime" value={h.closeTime || '17:00'} disabled={h.closed} minuteStep={5} />
					{#if h.closed}
						<span class="ml-3 rounded-sm bg-berry/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-berry">
							{lang === 'sv' ? 'Stängt' : 'Closed'}
						</span>
					{/if}
				</div>

				<label class="flex cursor-pointer select-none items-center gap-1.5 text-xs text-cocoa-500 transition hover:text-cocoa">
					<input type="checkbox" name="closed" checked={h.closed} class="h-3.5 w-3.5 accent-berry" />
					{lang === 'sv' ? 'Stängt' : 'Closed'}
				</label>

				<button
					type="submit"
					class="rounded-md border border-cocoa/15 bg-transparent px-3 py-1.5 text-xs font-medium text-cocoa transition hover:border-cocoa hover:bg-cocoa hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cocoa focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
					class:saved-flash={savedWeekday === wd}
					aria-label={lang === 'sv' ? `Spara ${m(`weekday_${wd}` as 'weekday_0')}` : `Save ${m(`weekday_${wd}` as 'weekday_0')}`}
				>
					{#if savedWeekday === wd}
						<span class="inline-flex items-center gap-1">
							<Check class="h-3 w-3" aria-hidden="true" />
							{lang === 'sv' ? 'Sparat' : 'Saved'}
						</span>
					{:else}
						{lang === 'sv' ? 'Spara' : 'Save'}
					{/if}
				</button>
			</form>
		</li>
	{/each}
</ol>

<p class="mt-6 text-[11px] text-cocoa-500">
	{lang === 'sv'
		? 'Tider visas i 24-timmars format på sajten. "Öppet nu"-rutan på startsidan räknas mot Stockholm-tid.'
		: 'Times display in 24-hour format on the public site. The "Open now" widget uses Stockholm time.'}
</p>

<style>
	.preset-link {
		color: var(--color-cocoa);
		font-weight: 500;
		border-bottom: 1px solid transparent;
		transition: border-color 0.15s, color 0.15s;
	}
	.preset-link:hover {
		color: var(--color-berry);
		border-bottom-color: var(--color-berry);
	}
	.preset-link:focus-visible {
		outline: none;
		color: var(--color-berry);
		border-bottom-color: var(--color-berry);
	}
	.saved-flash {
		border-color: var(--color-leaf) !important;
		background: rgb(110 127 74 / 0.12) !important;
		color: var(--color-leaf) !important;
	}
	@media (prefers-reduced-motion: reduce) {
		.preset-link,
		.saved-flash {
			transition: none;
		}
	}
</style>
