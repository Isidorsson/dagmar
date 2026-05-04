<script lang="ts">
	export let name: string;
	export let value: string = '00:00';
	export let disabled: boolean = false;
	export let minuteStep: 1 | 5 | 10 | 15 | 30 = 5;

	const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
	const minutes = Array.from({ length: Math.floor(60 / minuteStep) }, (_, i) =>
		String(i * minuteStep).padStart(2, '0')
	);

	function safe(v: string) {
		const match = /^(\d{1,2}):(\d{1,2})$/.exec(v);
		if (!match) return ['00', '00'] as const;
		const hh = String(Math.min(23, Math.max(0, parseInt(match[1])))).padStart(2, '0');
		const mm = String(Math.min(59, Math.max(0, parseInt(match[2])))).padStart(2, '0');
		return [hh, mm] as const;
	}

	function snap(mm: string) {
		if (minutes.includes(mm)) return mm;
		const n = parseInt(mm);
		const closest = minutes
			.map((opt) => ({ opt, d: Math.abs(parseInt(opt) - n) }))
			.sort((a, b) => a.d - b.d)[0].opt;
		return closest;
	}

	$: [initH, initM] = safe(value);
	let h = initH;
	let m = snap(initM);
	$: combined = `${h}:${m}`;
</script>

<span
	class="tp inline-flex items-baseline gap-0 font-display text-lg tracking-tight tabular-nums"
	class:tp-disabled={disabled}
>
	<select bind:value={h} {disabled} aria-label="Timme" class="tp-select">
		{#each hours as opt (opt)}
			<option value={opt}>{opt}</option>
		{/each}
	</select>
	<span class="tp-sep" aria-hidden="true">.</span>
	<select bind:value={m} {disabled} aria-label="Minut" class="tp-select">
		{#each minutes as opt (opt)}
			<option value={opt}>{opt}</option>
		{/each}
	</select>
	<input type="hidden" {name} value={combined} />
</span>

<style>
	.tp {
		position: relative;
	}
	.tp-select {
		appearance: none;
		background: transparent;
		border: 0;
		padding: 0 0.05em;
		margin: 0;
		font: inherit;
		font-variant-numeric: tabular-nums;
		font-feature-settings: 'tnum';
		color: inherit;
		cursor: pointer;
		text-align: center;
		text-align-last: center;
		border-radius: 0.25rem;
		transition: background-color 0.15s;
	}
	.tp-select:hover:not(:disabled) {
		background: rgba(58, 36, 24, 0.06);
	}
	.tp-select:focus-visible {
		outline: none;
		background: rgba(58, 36, 24, 0.1);
		box-shadow: 0 0 0 2px rgba(168, 50, 74, 0.4);
	}
	.tp-sep {
		font-feature-settings: 'tnum';
		opacity: 0.6;
		transform: translateY(-0.05em);
	}
	.tp-disabled {
		text-decoration: line-through;
		text-decoration-thickness: 1px;
		text-decoration-color: rgba(58, 36, 24, 0.35);
		opacity: 0.55;
	}
	.tp-disabled .tp-select {
		cursor: not-allowed;
	}
	@media (prefers-reduced-motion: reduce) {
		.tp-select {
			transition: none;
		}
	}
</style>
