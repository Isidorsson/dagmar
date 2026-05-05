<script lang="ts">
	export let name: string;
	export let value: string = '00:00';
	export let disabled: boolean = false;
	export let minuteStep: 1 | 5 | 10 | 15 | 30 = 5;
	export let ariaLabel: string = 'Tid';

	const minutes = Array.from({ length: Math.floor(60 / minuteStep) }, (_, i) =>
		String(i * minuteStep).padStart(2, '0')
	);

	function clampHHMM(hh: number, mm: number): [string, string] {
		let total = hh * 60 + mm;
		if (total < 0) total = 0;
		if (total > 23 * 60 + 59) total = 23 * 60 + 59;
		const h = Math.floor(total / 60);
		const m = total - h * 60;
		return [String(h).padStart(2, '0'), String(m).padStart(2, '0')];
	}

	function snap(mm: string): string {
		if (minutes.includes(mm)) return mm;
		const n = parseInt(mm, 10);
		const closest = minutes
			.map((opt) => ({ opt, d: Math.abs(parseInt(opt, 10) - n) }))
			.sort((a, b) => a.d - b.d)[0].opt;
		return closest;
	}

	function parseLoose(raw: string): string {
		const trimmed = raw.trim();
		if (!trimmed) return value;
		const colon = /^(\d{1,2}):(\d{1,2})$/.exec(trimmed);
		if (colon) {
			const [hh, mm] = clampHHMM(parseInt(colon[1], 10), parseInt(colon[2], 10));
			return hh + ':' + snap(mm);
		}
		const digits = trimmed.replace(/\D/g, '');
		if (!digits) return value;
		let hh = 0;
		let mm = 0;
		if (digits.length <= 2) {
			hh = parseInt(digits, 10);
		} else if (digits.length === 3) {
			hh = parseInt(digits.slice(0, 1), 10);
			mm = parseInt(digits.slice(1), 10);
		} else {
			hh = parseInt(digits.slice(0, 2), 10);
			mm = parseInt(digits.slice(2, 4), 10);
		}
		const [h, m] = clampHHMM(hh, mm);
		return h + ':' + snap(m);
	}

	function toMinutes(v: string): number {
		const m = /^(\d{2}):(\d{2})$/.exec(v);
		if (!m) return 0;
		return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
	}

	function bumpBy(minDelta: number) {
		const next = toMinutes(committed) + minDelta;
		const [h, m] = clampHHMM(0, next);
		committed = h + ':' + snap(m);
		display = committed;
	}

	let committed = parseLoose(value);
	let display = committed;
	let focused = false;
	let lastPropValue = value;

	$: if (value !== lastPropValue && !focused) {
		lastPropValue = value;
		const incoming = parseLoose(value);
		committed = incoming;
		display = incoming;
	}

	function commit() {
		const next = parseLoose(display);
		committed = next;
		display = next;
	}

	function onKeydown(e: KeyboardEvent) {
		if (disabled) return;
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			bumpBy(minuteStep);
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			bumpBy(-minuteStep);
		} else if (e.key === 'PageUp') {
			e.preventDefault();
			bumpBy(60);
		} else if (e.key === 'PageDown') {
			e.preventDefault();
			bumpBy(-60);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			(e.currentTarget as HTMLInputElement).blur();
		}
	}

	$: ariaValueNow = toMinutes(committed);
</script>

<span class="tp font-display text-lg tracking-tight tabular-nums" class:tp-disabled={disabled}>
	<input
		type="text"
		inputmode="numeric"
		maxlength="5"
		class="tp-input"
		value={display}
		{disabled}
		aria-label={ariaLabel}
		role="spinbutton"
		aria-valuemin="0"
		aria-valuemax={23 * 60 + 59}
		aria-valuenow={ariaValueNow}
		aria-valuetext={committed}
		on:focus={(e) => {
			focused = true;
			e.currentTarget.select();
		}}
		on:blur={() => {
			focused = false;
			commit();
		}}
		on:input={(e) => (display = e.currentTarget.value)}
		on:keydown={onKeydown}
	/>
	<input type="hidden" {name} value={committed} />
</span>

<style>
	.tp {
		display: inline-block;
	}
	.tp-input {
		appearance: none;
		background: transparent;
		border: 0;
		padding: 0.05em 0.3em;
		margin: 0;
		font: inherit;
		font-variant-numeric: tabular-nums;
		font-feature-settings: 'tnum';
		color: inherit;
		text-align: center;
		width: 4em;
		box-sizing: content-box;
		border-radius: 0.25rem;
		transition:
			background-color 0.15s,
			box-shadow 0.15s;
	}
	.tp-input:hover:not(:disabled) {
		background: rgba(58, 36, 24, 0.06);
	}
	.tp-input:focus {
		outline: none;
		background: rgba(58, 36, 24, 0.1);
		box-shadow: 0 0 0 2px rgba(168, 50, 74, 0.4);
	}
	.tp-disabled .tp-input {
		cursor: not-allowed;
		text-decoration: line-through;
		text-decoration-thickness: 1px;
		text-decoration-color: rgba(58, 36, 24, 0.35);
		opacity: 0.55;
	}
	@media (prefers-reduced-motion: reduce) {
		.tp-input {
			transition: none;
		}
	}
</style>
