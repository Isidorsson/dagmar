<script lang="ts">
	import { Plus, Trash2, Edit3, Star } from 'lucide-svelte';
	import { makeT } from '$lib/i18n';
	import { PRODUCT_TYPES, i18nKeyForType } from '$lib/productTypes';
	import type { ProductType } from '$lib/server/dummy';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);

	let showCreate = false;
	let editingId: string | null = null;
	let createType: ProductType = 'tarta';
	let editTypes: Record<string, ProductType> = {};
</script>

<svelte:head>
	<title>{m('admin_products')}</title>
</svelte:head>

<header class="flex items-center justify-between gap-4">
	<h1 class="font-display text-3xl">{m('admin_products')}</h1>
	<button class="btn-primary" on:click={() => (showCreate = !showCreate)}>
		<Plus class="h-4 w-4" /> {m('admin_add_product')}
	</button>
</header>

{#if showCreate}
	<form method="POST" action="?/create" enctype="multipart/form-data" class="card mt-6 grid gap-4 p-6 md:grid-cols-2">
		<label class="block">
			<span class="text-xs font-medium uppercase text-cocoa-500">slug</span>
			<input name="slug" required class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
		</label>
		<label class="block">
			<span class="text-xs font-medium uppercase text-cocoa-500">{lang === 'sv' ? 'Produkttyp' : 'Product type'}</span>
			<select
				name="productType"
				bind:value={createType}
				class="mt-1 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm"
			>
				{#each PRODUCT_TYPES as t (t)}
					<option value={t}>{m(i18nKeyForType(t))}</option>
				{/each}
			</select>
		</label>
		{#if createType === 'tarta'}
			<label class="block md:col-span-2">
				<span class="text-xs font-medium uppercase text-cocoa-500">{lang === 'sv' ? 'Tårtkategori' : 'Cake category'}</span>
				<select name="category" class="mt-1 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm">
					<option value="ordinarie">{m('category_ordinarie')}</option>
					<option value="specialtarta">{m('category_specialtarta')}</option>
					<option value="eget-motiv">{m('category_eget_motiv')}</option>
				</select>
			</label>
		{/if}
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
			<input name="imageUrl" type="url" placeholder="https://..." class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
		</label>
		<label class="block">
			<span class="text-xs font-medium uppercase text-cocoa-500">{lang === 'sv' ? 'Enhet (SV)' : 'Unit (SV)'}</span>
			<input name="unitSv" placeholder="t.ex. per limpa, per påse" class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
		</label>
		<label class="block">
			<span class="text-xs font-medium uppercase text-cocoa-500">{lang === 'sv' ? 'Enhet (EN)' : 'Unit (EN)'}</span>
			<input name="unitEn" placeholder="e.g. per loaf, per bag" class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
		</label>
		<label class="block">
			<span class="text-xs font-medium uppercase text-cocoa-500">{m('weight_label')} (g)</span>
			<input name="weightGrams" type="number" min="0" class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
		</label>
		<label class="block">
			<span class="text-xs font-medium uppercase text-cocoa-500">{lang === 'sv' ? 'Lagerantal' : 'Stock count'}</span>
			<input name="stockCount" type="number" min="0" placeholder={lang === 'sv' ? 'Lämna tomt = inte räknat' : 'Leave blank = not tracked'} class="mt-1 w-full rounded-lg border border-cream-200 px-3 py-2 text-sm" />
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
	{#each data.products as product (product._id)}
		<article class="card flex flex-col gap-4 p-4 md:flex-row md:items-center">
			<img src={product.imageUrl} alt={product.nameSv} class="h-20 w-28 shrink-0 rounded-lg object-cover" />
			<div class="min-w-0 flex-1">
				<div class="flex items-center gap-2">
					<span class="font-display text-lg">{product.nameSv}</span>
					{#if product.featured}<Star class="h-4 w-4 fill-berry text-berry" />{/if}
				</div>
				<div class="text-sm text-cocoa-500">
					{m(i18nKeyForType(product.productType))}
					· {product.slug}
					{#if product.category} · {product.category}{/if}
					· {product.priceFrom} kr
					{#if product.stockCount !== undefined}
						· {product.stockCount === 0 ? m('stock_out') : `${product.stockCount} st`}
					{/if}
				</div>
			</div>
			<div class="flex gap-1">
				<button class="btn-ghost" on:click={() => {
					editingId = editingId === product._id ? null : product._id;
					if (editingId) editTypes[product._id] = product.productType;
				}} aria-label="Edit">
					<Edit3 class="h-4 w-4" />
				</button>
				<form method="POST" action="?/delete" on:submit={(e) => { if (!confirm(m('admin_confirm_delete'))) e.preventDefault(); }}>
					<input type="hidden" name="id" value={product._id} />
					<button class="btn-ghost text-berry" type="submit" aria-label="Delete">
						<Trash2 class="h-4 w-4" />
					</button>
				</form>
			</div>
			{#if editingId === product._id}
				<form method="POST" action="?/update" class="grid w-full gap-3 border-t border-cream-200 pt-4 md:grid-cols-2">
					<input type="hidden" name="id" value={product._id} />
					<label class="block">
						<span class="text-xs font-medium uppercase text-cocoa-500">{lang === 'sv' ? 'Produkttyp' : 'Product type'}</span>
						<select
							name="productType"
							bind:value={editTypes[product._id]}
							class="mt-1 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm"
						>
							{#each PRODUCT_TYPES as t (t)}
								<option value={t}>{m(i18nKeyForType(t))}</option>
							{/each}
						</select>
					</label>
					{#if editTypes[product._id] === 'tarta'}
						<label class="block">
							<span class="text-xs font-medium uppercase text-cocoa-500">{lang === 'sv' ? 'Tårtkategori' : 'Cake category'}</span>
							<select name="category" value={product.category ?? 'ordinarie'} class="mt-1 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm">
								<option value="ordinarie">{m('category_ordinarie')}</option>
								<option value="specialtarta">{m('category_specialtarta')}</option>
								<option value="eget-motiv">{m('category_eget_motiv')}</option>
							</select>
						</label>
					{/if}
					<input name="nameSv" value={product.nameSv} class="rounded-lg border border-cream-200 px-3 py-2 text-sm" />
					<input name="nameEn" value={product.nameEn} class="rounded-lg border border-cream-200 px-3 py-2 text-sm" />
					<textarea name="descSv" rows="2" class="rounded-lg border border-cream-200 px-3 py-2 text-sm md:col-span-2">{product.descSv}</textarea>
					<textarea name="descEn" rows="2" class="rounded-lg border border-cream-200 px-3 py-2 text-sm md:col-span-2">{product.descEn}</textarea>
					<input name="priceFrom" type="number" value={product.priceFrom} class="rounded-lg border border-cream-200 px-3 py-2 text-sm" />
					<input name="imageUrl" type="url" value={product.imageUrl} class="rounded-lg border border-cream-200 px-3 py-2 text-sm" />
					<input name="unitSv" value={product.unitSv ?? ''} placeholder={lang === 'sv' ? 'Enhet (SV)' : 'Unit (SV)'} class="rounded-lg border border-cream-200 px-3 py-2 text-sm" />
					<input name="unitEn" value={product.unitEn ?? ''} placeholder={lang === 'sv' ? 'Enhet (EN)' : 'Unit (EN)'} class="rounded-lg border border-cream-200 px-3 py-2 text-sm" />
					<input name="weightGrams" type="number" min="0" value={product.weightGrams ?? ''} placeholder={`${m('weight_label')} (g)`} class="rounded-lg border border-cream-200 px-3 py-2 text-sm" />
					<input name="stockCount" type="number" min="0" value={product.stockCount ?? ''} placeholder={lang === 'sv' ? 'Lagerantal' : 'Stock count'} class="rounded-lg border border-cream-200 px-3 py-2 text-sm" />
					<label class="flex items-center gap-2 text-sm">
						<input type="checkbox" name="available" checked={product.available} /> {lang === 'sv' ? 'Tillgänglig' : 'Available'}
					</label>
					<label class="flex items-center gap-2 text-sm">
						<input type="checkbox" name="featured" checked={product.featured} /> {lang === 'sv' ? 'Visa på startsidan' : 'Show on homepage'}
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
