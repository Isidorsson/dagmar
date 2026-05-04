<script lang="ts">
	import type { Lang } from '$lib/i18n';
	import { makeT } from '$lib/i18n';

	export let lang: Lang;
	export let dietary: ('glutenfri' | 'laktosfri' | 'vegan' | 'notfri')[] = [];

	const m = makeT(lang);
	const keyFor: Record<string, 'diet_glutenfri' | 'diet_laktosfri' | 'diet_vegan' | 'diet_notfri'> = {
		glutenfri: 'diet_glutenfri',
		laktosfri: 'diet_laktosfri',
		vegan: 'diet_vegan',
		notfri: 'diet_notfri'
	};
</script>

<div class="flex flex-wrap gap-1.5">
	{#each dietary as d (d)}
		<span class="tag bg-leaf/15 text-leaf">{m(keyFor[d])}</span>
	{/each}
</div>
