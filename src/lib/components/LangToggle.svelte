<script lang="ts">
	import { page } from '$app/stores';
	import type { Lang } from '$lib/i18n';
	export let lang: Lang;

	function hrefFor(target: Lang) {
		const url = new URL($page.url);
		url.searchParams.set('lang', target);
		return url.pathname + '?' + url.searchParams.toString();
	}
</script>

<div class="inline-flex items-center gap-0.5 rounded-full bg-cream-200 p-0.5 text-xs font-medium">
	<a
		href={hrefFor('sv')}
		class="rounded-full px-2.5 py-1 transition"
		class:bg-cocoa={lang === 'sv'}
		class:text-cream={lang === 'sv'}
		class:text-cocoa-700={lang !== 'sv'}
		aria-current={lang === 'sv' ? 'true' : undefined}
		data-sveltekit-reload>SV</a
	>
	<a
		href={hrefFor('en')}
		class="rounded-full px-2.5 py-1 transition"
		class:bg-cocoa={lang === 'en'}
		class:text-cream={lang === 'en'}
		class:text-cocoa-700={lang !== 'en'}
		aria-current={lang === 'en' ? 'true' : undefined}
		data-sveltekit-reload>EN</a
	>
</div>
