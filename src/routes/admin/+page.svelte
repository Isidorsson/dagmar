<script lang="ts">
	import { Inbox, Cake, Newspaper, ArrowRight } from 'lucide-svelte';
	import { makeT } from '$lib/i18n';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);
</script>

<svelte:head>
	<title>{m('admin_dashboard')}</title>
</svelte:head>

<h1 class="font-display text-3xl">{m('admin_dashboard')}</h1>

<div class="mt-6 grid gap-4 sm:grid-cols-3">
	<a href="/admin/bestallningar" class="card flex items-center justify-between p-5 transition hover:bg-cream-200">
		<div>
			<div class="text-sm text-cocoa-500">{m('admin_new_orders')}</div>
			<div class="mt-1 font-display text-3xl">{data.newCount}</div>
		</div>
		<Inbox class="h-6 w-6 text-berry" />
	</a>
	<a href="/admin/tartor" class="card flex items-center justify-between p-5 transition hover:bg-cream-200">
		<div>
			<div class="text-sm text-cocoa-500">{m('admin_cakes')}</div>
			<div class="mt-1 font-display text-3xl">{data.cakeCount}</div>
		</div>
		<Cake class="h-6 w-6 text-cocoa" />
	</a>
	<a href="/admin/nyheter" class="card flex items-center justify-between p-5 transition hover:bg-cream-200">
		<div>
			<div class="text-sm text-cocoa-500">{m('admin_news')}</div>
			<div class="mt-1 font-display text-3xl">{data.newsItems.length}</div>
		</div>
		<Newspaper class="h-6 w-6 text-leaf" />
	</a>
</div>

<section class="mt-10">
	<h2 class="mb-4 font-display text-xl">{lang === 'sv' ? 'Senaste beställningar' : 'Recent orders'}</h2>
	<div class="card divide-y divide-cream-200">
		{#each data.recentOrders as o (o._id)}
			<a href="/admin/bestallningar" class="flex items-baseline gap-4 px-5 py-3 hover:bg-cream-200/40">
				<span class="tag">{o.status}</span>
				<div class="min-w-0 flex-1">
					<div class="font-medium">{o.customerName}</div>
					<div class="truncate text-sm text-cocoa-500">{o.designNotes}</div>
				</div>
				<div class="hidden text-sm text-cocoa-500 sm:block">{o.desiredDate}</div>
				<ArrowRight class="h-4 w-4 text-cocoa-500" />
			</a>
		{:else}
			<p class="p-5 text-sm text-cocoa-500">—</p>
		{/each}
	</div>
</section>
