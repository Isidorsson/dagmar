<script lang="ts">
	import { Phone, Mail, MapPin } from 'lucide-svelte';
	import { makeT } from '$lib/i18n';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);
	$: cfg = data.siteConfig;
</script>

<svelte:head>
	<title>{m('nav_contact')} — {m('site_name')}</title>
</svelte:head>

<section class="mx-auto max-w-7xl px-6 py-16">
	<h1 class="font-display text-4xl md:text-5xl">{m('section_visit')}</h1>

	<div class="mt-10 grid gap-10 md:grid-cols-[1fr_2fr]">
		<dl class="space-y-6 text-sm">
			<div>
				<dt class="font-medium">{m('address_label')}</dt>
				<dd class="mt-1 flex items-start gap-2 text-cocoa-700">
					<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-berry" />{cfg.address}
				</dd>
			</div>
			<div>
				<dt class="font-medium">{m('phone_label')}</dt>
				<dd class="mt-1">
					<a href="tel:{cfg.contactPhone}" class="inline-flex items-center gap-2 text-cocoa-700 hover:text-berry">
						<Phone class="h-4 w-4 text-berry" />{cfg.contactPhone}
					</a>
				</dd>
			</div>
			<div>
				<dt class="font-medium">{m('email_label')}</dt>
				<dd class="mt-1">
					<a href="mailto:{cfg.contactEmail}" class="inline-flex items-center gap-2 text-cocoa-700 hover:text-berry">
						<Mail class="h-4 w-4 text-berry" />{cfg.contactEmail}
					</a>
				</dd>
			</div>
		</dl>

		<div class="aspect-[16/10] overflow-hidden rounded-card bg-cream-200 shadow-card">
			<iframe
				src="https://www.openstreetmap.org/export/embed.html?bbox=12.279%2C58.282%2C12.298%2C58.292&layer=mapnik&marker=58.287%2C12.288"
				class="h-full w-full border-0"
				title="Map"
				loading="lazy"
			></iframe>
		</div>
	</div>
</section>
