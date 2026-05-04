<script lang="ts">
	import { Trash2, Pin } from 'lucide-svelte';
	import { makeT } from '$lib/i18n';
	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);
</script>

<svelte:head>
	<title>{m('admin_news')}</title>
</svelte:head>

<h1 class="font-display text-3xl">{m('admin_news')}</h1>

<form method="POST" action="?/create" class="card mt-6 grid gap-3 p-5 md:grid-cols-2">
	<input name="titleSv" required placeholder="Titel SV" class="rounded-lg border border-cream-200 px-3 py-2 text-sm" />
	<input name="titleEn" required placeholder="Title EN" class="rounded-lg border border-cream-200 px-3 py-2 text-sm" />
	<textarea name="bodySv" rows="3" placeholder="Brödtext SV" class="rounded-lg border border-cream-200 px-3 py-2 text-sm md:col-span-2"></textarea>
	<textarea name="bodyEn" rows="3" placeholder="Body EN" class="rounded-lg border border-cream-200 px-3 py-2 text-sm md:col-span-2"></textarea>
	<input name="imageUrl" type="url" placeholder="Image URL (optional)" class="rounded-lg border border-cream-200 px-3 py-2 text-sm md:col-span-2" />
	<label class="flex items-center gap-2 text-sm">
		<input type="checkbox" name="pinned" /> {lang === 'sv' ? 'Visa som banner' : 'Pin as banner'}
	</label>
	<button class="btn-primary md:col-span-2" type="submit">{m('admin_save')}</button>
</form>

<div class="mt-6 space-y-3">
	{#each data.items as n (n._id)}
		<article class="card flex items-start justify-between gap-4 p-4">
			<div class="min-w-0 flex-1">
				<div class="flex items-center gap-2">
					<span class="font-display text-lg">{n.titleSv}</span>
					{#if n.pinned}<Pin class="h-4 w-4 text-berry" />{/if}
				</div>
				<p class="line-clamp-2 text-sm text-cocoa-500">{n.bodySv}</p>
			</div>
			<form method="POST" action="?/delete">
				<input type="hidden" name="id" value={n._id} />
				<button class="btn-ghost text-berry"><Trash2 class="h-4 w-4" /></button>
			</form>
		</article>
	{/each}
</div>
