<script lang="ts">
	import { Megaphone, X } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { Lang } from '$lib/i18n';

	export let lang: Lang;
	export let news: { _id: string; titleSv: string; titleEn: string; bodySv: string; bodyEn: string } | null;

	let dismissed = false;
	$: title = news ? (lang === 'sv' ? news.titleSv : news.titleEn) : '';
	$: body = news ? (lang === 'sv' ? news.bodySv : news.bodyEn) : '';

	onMount(() => {
		if (!news) return;
		const key = `news-dismissed-${news._id}`;
		dismissed = sessionStorage.getItem(key) === '1';
	});

	function dismiss() {
		if (!news) return;
		sessionStorage.setItem(`news-dismissed-${news._id}`, '1');
		dismissed = true;
	}
</script>

{#if news && !dismissed}
	<aside
		class="border-b border-cream-200 bg-cream-200/50 px-6 py-3 text-sm"
		role="region"
		aria-label="Announcement"
	>
		<div class="mx-auto flex max-w-7xl items-center gap-3">
			<Megaphone class="h-4 w-4 shrink-0 text-berry" />
			<p class="flex-1 truncate"><strong class="font-semibold">{title}</strong> · {body}</p>
			<button
				on:click={dismiss}
				class="rounded-full p-1 text-cocoa-500 transition hover:bg-cream-200"
				aria-label="Dismiss"
			>
				<X class="h-4 w-4" />
			</button>
		</div>
	</aside>
{/if}
