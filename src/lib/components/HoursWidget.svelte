<script lang="ts">
	import { Clock } from 'lucide-svelte';
	import type { Lang } from '$lib/i18n';
	import { makeT } from '$lib/i18n';

	export let lang: Lang;
	export let hours: { weekday: number; openTime: string; closeTime: string; closed: boolean }[];
	export let compact = false;

	const m = makeT(lang);

	function nowInStockholm() {
		const formatter = new Intl.DateTimeFormat('en-GB', {
			timeZone: 'Europe/Stockholm',
			weekday: 'short',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
		const parts = formatter.formatToParts(new Date());
		const wdName = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon';
		const hh = parts.find((p) => p.type === 'hour')?.value ?? '00';
		const mm = parts.find((p) => p.type === 'minute')?.value ?? '00';
		const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
		return { weekday: map[wdName] ?? 1, time: `${hh}:${mm}` };
	}

	$: now = nowInStockholm();
	$: today = hours.find((h) => h.weekday === now.weekday);
	$: status = (() => {
		if (!today || today.closed) return { open: false, label: m('closed_today') };
		if (now.time < today.openTime) return { open: false, label: m('opens_at', { time: today.openTime }) };
		if (now.time >= today.closeTime) return { open: false, label: m('closes_at', { time: today.closeTime }) };
		return { open: true, label: m('closes_at', { time: today.closeTime }) };
	})();
</script>

{#if compact}
	<div class="inline-flex items-center gap-2 text-sm">
		<span
			class="inline-flex h-2 w-2 rounded-full"
			class:bg-leaf={status.open}
			class:bg-berry={!status.open}
		></span>
		<span class="font-medium">{status.open ? m('open_now') : m('closed_now')}</span>
		<span class="text-cocoa-500">· {status.label}</span>
	</div>
{:else}
	<div class="card p-6">
		<div class="mb-4 flex items-center gap-3">
			<div
				class="flex h-10 w-10 items-center justify-center rounded-full"
				class:bg-leaf={status.open}
				class:bg-berry={!status.open}
			>
				<Clock class="h-5 w-5 text-cream" />
			</div>
			<div>
				<div class="font-display text-lg font-semibold">
					{status.open ? m('open_now') : m('closed_now')}
				</div>
				<div class="text-sm text-cocoa-500">{status.label}</div>
			</div>
		</div>
		<dl class="space-y-1.5 text-sm">
			{#each hours as h (h.weekday)}
				<div
					class="flex items-baseline justify-between gap-4 rounded-lg px-2 py-1"
					class:bg-cream-200={h.weekday === now.weekday}
				>
					<dt class="font-medium">{m(`weekday_${h.weekday}` as 'weekday_0')}</dt>
					<dd class="text-cocoa-500">
						{#if h.closed}
							{m('closed_today')}
						{:else}
							{h.openTime}–{h.closeTime}
						{/if}
					</dd>
				</div>
			{/each}
		</dl>
	</div>
{/if}
