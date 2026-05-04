<script lang="ts">
	import { enhance } from '$app/forms';
	import { CheckCircle2 } from 'lucide-svelte';
	import { makeT } from '$lib/i18n';

	export let data;
	export let form;
	$: lang = data.lang;
	$: m = makeT(lang);

	let submitting = false;
</script>

<svelte:head>
	<title>{m('order_form_title')} — {m('site_name')}</title>
	<meta name="description" content={m('order_form_intro')} />
</svelte:head>

<section class="mx-auto max-w-3xl px-6 py-16">
	<header class="mb-10">
		<h1 class="font-display text-4xl md:text-5xl">{m('order_form_title')}</h1>
		<p class="mt-3 text-lg text-cocoa-500">{m('order_form_intro')}</p>
	</header>

	{#if form?.success}
		<div class="card flex items-start gap-4 border border-leaf/30 bg-leaf/10 p-6">
			<CheckCircle2 class="mt-0.5 h-6 w-6 shrink-0 text-leaf" />
			<div>
				<h2 class="font-display text-xl">{m('submit_success')}</h2>
				<p class="mt-2 text-sm text-cocoa-700">
					{lang === 'sv'
						? 'En bekräftelse har skickats till bageriet. De hör av sig inom 24 timmar.'
						: 'A confirmation has been sent to the bakery. They will reach out within 24 hours.'}
				</p>
			</div>
		</div>
	{:else}
		<form
			method="POST"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					await update();
					submitting = false;
				};
			}}
			class="card space-y-5 p-6 md:p-8"
		>
			<div class="grid gap-5 md:grid-cols-2">
				<label class="block">
					<span class="text-sm font-medium">{m('field_name')}</span>
					<input
						name="customerName"
						required
						value={form?.values?.customerName ?? ''}
						class="mt-1.5 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm focus:border-cocoa focus:outline-none"
					/>
					{#if form?.errors?.customerName}
						<span class="text-xs text-berry">!</span>
					{/if}
				</label>
				<label class="block">
					<span class="text-sm font-medium">{m('field_phone')}</span>
					<input
						name="phone"
						required
						type="tel"
						value={form?.values?.phone ?? ''}
						class="mt-1.5 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm focus:border-cocoa focus:outline-none"
					/>
				</label>
				<label class="block md:col-span-2">
					<span class="text-sm font-medium">{m('field_email')}</span>
					<input
						name="email"
						required
						type="email"
						value={form?.values?.email ?? ''}
						class="mt-1.5 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm focus:border-cocoa focus:outline-none"
					/>
				</label>
				<label class="block">
					<span class="text-sm font-medium">{m('field_date')}</span>
					<input
						name="desiredDate"
						required
						type="date"
						value={form?.values?.desiredDate ?? ''}
						class="mt-1.5 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm focus:border-cocoa focus:outline-none"
					/>
				</label>
				<label class="block">
					<span class="text-sm font-medium">{m('field_servings')}</span>
					<input
						name="servings"
						required
						type="number"
						min="1"
						max="200"
						value={form?.values?.servings ?? 12}
						class="mt-1.5 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm focus:border-cocoa focus:outline-none"
					/>
				</label>
				<label class="block md:col-span-2">
					<span class="text-sm font-medium">{m('field_occasion')}</span>
					<input
						name="occasion"
						value={form?.values?.occasion ?? ''}
						placeholder={lang === 'sv' ? 'Bröllop, dop, födelsedag…' : 'Wedding, christening, birthday…'}
						class="mt-1.5 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm focus:border-cocoa focus:outline-none"
					/>
				</label>
				<label class="block md:col-span-2">
					<span class="text-sm font-medium">{m('field_design')}</span>
					<textarea
						name="designNotes"
						required
						rows="6"
						value={form?.values?.designNotes ?? ''}
						class="mt-1.5 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm focus:border-cocoa focus:outline-none"
					></textarea>
				</label>
				<label class="block md:col-span-2">
					<span class="text-sm font-medium">{m('field_allergens')}</span>
					<input
						name="allergens"
						value={form?.values?.allergens ?? ''}
						class="mt-1.5 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm focus:border-cocoa focus:outline-none"
					/>
				</label>
			</div>
			<button type="submit" disabled={submitting} class="btn-accent w-full disabled:opacity-50 md:w-auto">
				{submitting ? '…' : m('submit_order')}
			</button>
		</form>
	{/if}
</section>
