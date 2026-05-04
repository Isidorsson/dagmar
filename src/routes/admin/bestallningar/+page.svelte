<script lang="ts">
	import { Phone, Mail, Calendar } from 'lucide-svelte';
	import { makeT } from '$lib/i18n';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);

	const statuses = ['new', 'seen', 'accepted', 'declined'] as const;
	const statusColor = {
		new: 'bg-berry text-cream',
		seen: 'bg-cream-200 text-cocoa',
		accepted: 'bg-leaf/20 text-leaf',
		declined: 'bg-cocoa-500 text-cream'
	} as const;
</script>

<svelte:head>
	<title>{m('admin_orders')}</title>
</svelte:head>

<h1 class="font-display text-3xl">{m('admin_orders')}</h1>

<div class="mt-6 space-y-4">
	{#each data.orders as o (o._id)}
		<article class="card p-5">
			<header class="flex flex-wrap items-baseline justify-between gap-3">
				<div>
					<div class="font-display text-lg">{o.customerName}</div>
					<div class="text-sm text-cocoa-500">{new Date(o.createdAt).toLocaleString(lang === 'sv' ? 'sv-SE' : 'en-GB')}</div>
				</div>
				<span class="tag {statusColor[o.status]}">{o.status}</span>
			</header>

			<dl class="mt-4 grid gap-3 text-sm md:grid-cols-3">
				<div class="flex items-center gap-2 text-cocoa-700">
					<Calendar class="h-4 w-4 text-berry" />{o.desiredDate} · {o.servings} st
				</div>
				<a href="tel:{o.phone}" class="flex items-center gap-2 text-cocoa-700 hover:text-berry">
					<Phone class="h-4 w-4 text-berry" />{o.phone}
				</a>
				<a href="mailto:{o.email}" class="flex items-center gap-2 text-cocoa-700 hover:text-berry">
					<Mail class="h-4 w-4 text-berry" />{o.email}
				</a>
			</dl>

			{#if o.occasion}
				<p class="mt-4 text-sm"><strong class="font-medium">{m('field_occasion')}:</strong> {o.occasion}</p>
			{/if}
			<p class="mt-2 whitespace-pre-wrap text-sm text-cocoa-700">{o.designNotes}</p>
			{#if o.allergens}
				<p class="mt-2 text-sm text-cocoa-500"><strong>{m('field_allergens')}:</strong> {o.allergens}</p>
			{/if}

			<form method="POST" action="?/setStatus" class="mt-4 flex flex-wrap gap-2">
				<input type="hidden" name="id" value={o._id} />
				{#each statuses as s (s)}
					<button
						type="submit"
						name="status"
						value={s}
						class="tag transition hover:bg-cream-200 {o.status === s ? statusColor[s] : ''}"
					>{s}</button>
				{/each}
			</form>
		</article>
	{:else}
		<p class="text-cocoa-500">—</p>
	{/each}
</div>
