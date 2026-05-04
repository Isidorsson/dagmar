<script lang="ts">
	import { Plus, Trash2, Edit3, Star, EyeOff, Eye } from 'lucide-svelte';
	import { makeT } from '$lib/i18n';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);

	let showCreate = false;
	let editingId: string | null = null;
</script>

<svelte:head>
	<title>{m('admin_cakes')}</title>
</svelte:head>

<header class="flex items-center justify-between gap-4">
	<h1 class="font-display text-3xl">{m('admin_cakes')}</h1>
	<button class="btn-primary" on:click={() => (showCreate = !showCreate)}>
		<Plus class="h-4 w-4" /> {m('admin_add_cake')}
	</button>
</header>

{#if showCreate}
	<form method="POST" action="?/create" class="card mt-6 grid gap-4 p-6 md:grid-cols-2">
		<label class="block">
			<span class="text-xs font-medium uppercase text-cocoa-500">slug</span>
			<input name="slug" required class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
		</label>
		<label class="block">
			<span class="text-xs font-medium uppercase text-cocoa-500">{lang === 'sv' ? 'Kategori' : 'Category'}</span>
			<select name="category" class="mt-1 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm">
				<option value="ordinarie">{m('category_ordinarie')}</option>
				<option value="specialtarta">{m('category_specialtarta')}</option>
				<option value="eget-motiv">{m('category_eget_motiv')}</option>
			</select>
		</label>
		<label class="block">
			<span class="text-xs font-medium uppercase text-cocoa-500">Namn (SV)</span>
			<input name="nameSv" required class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
		</label>
		<label class="block">
			<span class="text-xs font-medium uppercase text-cocoa-500">Name (EN)</span>
			<input name="nameEn" required class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
		</label>
		<label class="block md:col-span-2">
			<span class="text-xs font-medium uppercase text-cocoa-500">Beskrivning (SV)</span>
			<textarea name="descSv" rows="3" class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm"></textarea>
		</label>
		<label class="block md:col-span-2">
			<span class="text-xs font-medium uppercase text-cocoa-500">Description (EN)</span>
			<textarea name="descEn" rows="3" class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm"></textarea>
		</label>
		<label class="block">
			<span class="text-xs font-medium uppercase text-cocoa-500">Pris från (kr)</span>
			<input name="priceFrom" type="number" min="0" class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
		</label>
		<label class="block">
			<span class="text-xs font-medium uppercase text-cocoa-500">Image URL</span>
			<input name="imageUrl" type="url" class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
		</label>
		<label class="block md:col-span-2">
			<span class="text-xs font-medium uppercase text-cocoa-500">Allergener (komma-separerat)</span>
			<input name="allergens" class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
		</label>
		<fieldset class="md:col-span-2">
			<legend class="text-xs font-medium uppercase text-cocoa-500">{m('filter_dietary')}</legend>
			<div class="mt-2 flex flex-wrap gap-3 text-sm">
				{#each ['glutenfri', 'laktosfri', 'vegan', 'notfri'] as d (d)}
					<label class="flex items-center gap-2">
						<input type="checkbox" name="dietary" value={d} /> {d}
					</label>
				{/each}
			</div>
		</fieldset>
		<label class="flex items-center gap-2 text-sm">
			<input type="checkbox" name="available" checked /> {lang === 'sv' ? 'Tillgänglig' : 'Available'}
		</label>
		<label class="flex items-center gap-2 text-sm">
			<input type="checkbox" name="featured" /> {lang === 'sv' ? 'Visa på startsidan' : 'Show on homepage'}
		</label>
		<div class="flex gap-2 md:col-span-2">
			<button class="btn-primary" type="submit">{m('admin_save')}</button>
			<button class="btn-ghost" type="button" on:click={() => (showCreate = false)}>{m('admin_cancel')}</button>
		</div>
	</form>
{/if}

<div class="mt-8 space-y-3">
	{#each data.cakes as cake (cake._id)}
		<article class="card flex flex-col gap-4 p-4 md:flex-row md:items-center">
			<img src={cake.imageUrl} alt={cake.nameSv} class="h-20 w-28 shrink-0 rounded-lg object-cover" />
			<div class="min-w-0 flex-1">
				<div class="flex items-center gap-2">
					<span class="font-display text-lg">{cake.nameSv}</span>
					{#if cake.featured}<Star class="h-4 w-4 fill-berry text-berry" />{/if}
				</div>
				<div class="text-sm text-cocoa-500">{cake.slug} · {cake.category} · {cake.priceFrom} kr</div>
			</div>
			<div class="flex gap-1">
				<button class="btn-ghost" on:click={() => (editingId = editingId === cake._id ? null : cake._id)} aria-label="Edit">
					<Edit3 class="h-4 w-4" />
				</button>
				<form method="POST" action="?/delete" on:submit={(e) => { if (!confirm(m('admin_confirm_delete'))) e.preventDefault(); }}>
					<input type="hidden" name="id" value={cake._id} />
					<button class="btn-ghost text-berry" type="submit" aria-label="Delete">
						<Trash2 class="h-4 w-4" />
					</button>
				</form>
			</div>
			{#if editingId === cake._id}
				<form method="POST" action="?/update" class="grid w-full gap-3 border-t border-cream-200 pt-4 md:grid-cols-2">
					<input type="hidden" name="id" value={cake._id} />
					<input name="nameSv" value={cake.nameSv} class="rounded-lg border border-cream-200 px-3 py-2 text-sm" />
					<input name="nameEn" value={cake.nameEn} class="rounded-lg border border-cream-200 px-3 py-2 text-sm" />
					<textarea name="descSv" rows="2" class="rounded-lg border border-cream-200 px-3 py-2 text-sm md:col-span-2">{cake.descSv}</textarea>
					<textarea name="descEn" rows="2" class="rounded-lg border border-cream-200 px-3 py-2 text-sm md:col-span-2">{cake.descEn}</textarea>
					<input name="priceFrom" type="number" value={cake.priceFrom} class="rounded-lg border border-cream-200 px-3 py-2 text-sm" />
					<input name="imageUrl" type="url" value={cake.imageUrl} class="rounded-lg border border-cream-200 px-3 py-2 text-sm" />
					<label class="flex items-center gap-2 text-sm">
						<input type="checkbox" name="available" checked={cake.available} /> Tillgänglig
					</label>
					<label class="flex items-center gap-2 text-sm">
						<input type="checkbox" name="featured" checked={cake.featured} /> Visa på startsidan
					</label>
					<div class="flex gap-2 md:col-span-2">
						<button class="btn-primary" type="submit">{m('admin_save')}</button>
						<button class="btn-ghost" type="button" on:click={() => (editingId = null)}>{m('admin_cancel')}</button>
					</div>
				</form>
			{/if}
		</article>
	{/each}
</div>
