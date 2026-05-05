<script lang="ts">
	import '../app.css';
	import { Cake, Phone, Mail, MapPin, Instagram } from 'lucide-svelte';
	import LangToggle from '$lib/components/LangToggle.svelte';
	import { makeT } from '$lib/i18n';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);
	$: cfg = data.siteConfig;

	$: jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Bakery',
		name: 'Dagmar Carlssons Hembageri Eftr.',
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Kungsgatan 16',
			postalCode: '461 31',
			addressLocality: 'Trollhättan',
			addressCountry: 'SE'
		},
		telephone: cfg.contactPhone,
		email: cfg.contactEmail,
		url: 'https://dagmarcarlssons.se',
		openingHoursSpecification: data.hours
			.filter((h) => !h.closed)
			.map((h) => ({
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][h.weekday],
				opens: h.openTime,
				closes: h.closeTime
			})),
		priceRange: '$$',
		servesCuisine: ['Swedish', 'Pastries', 'Cakes']
	});

	const navItems = [
		{ href: '/', key: 'nav_home' },
		{ href: '/sortiment', key: 'nav_assortment' },
		{ href: '/bestall', key: 'nav_order' },
		{ href: '/oppettider', key: 'nav_hours' },
		{ href: '/om-oss', key: 'nav_about' },
		{ href: '/kontakt', key: 'nav_contact' }
	] as const;
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<header class="sticky top-0 z-30 border-b border-cream-200 bg-cream/85 backdrop-blur-md">
	<div class="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3">
		<a href="/" class="group flex items-center gap-2 font-display text-lg font-semibold leading-none">
			<span
				class="flex h-9 w-9 items-center justify-center rounded-full bg-cocoa text-cream transition group-hover:bg-berry"
			>
				<Cake class="h-4 w-4" />
			</span>
			<span class="hidden sm:inline">Dagmar Carlssons</span>
		</a>
		<nav class="ml-auto hidden items-center gap-1 text-sm md:flex">
			{#each navItems as item (item.href)}
				<a
					href={item.href}
					class="rounded-full px-3 py-1.5 transition hover:bg-cream-200"
				>{m(item.key)}</a>
			{/each}
		</nav>
		<div class="ml-auto flex items-center gap-3 md:ml-0">
			<LangToggle {lang} />
			<a href="/admin" class="text-xs text-cocoa-500 hover:text-cocoa">{m('admin_login')}</a>
		</div>
	</div>
	<nav class="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-6 pb-2 text-sm md:hidden">
		{#each navItems as item (item.href)}
			<a
				href={item.href}
				class="shrink-0 rounded-full px-3 py-1.5 transition hover:bg-cream-200"
			>{m(item.key)}</a>
		{/each}
	</nav>
</header>

<main>
	<slot />
</main>

<footer class="border-t border-cream-200 bg-cream-50 px-6 py-12">
	<div class="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
		<div>
			<div class="font-display text-lg font-semibold">Dagmar Carlssons Hembageri</div>
			<p class="mt-2 text-sm text-cocoa-500">{m('footer_made_with')}</p>
		</div>
		<div class="text-sm">
			<div class="font-medium">{m('address_label')}</div>
			<a class="mt-1 inline-flex items-start gap-1.5 text-cocoa-500 hover:text-berry" href={cfg.mapEmbedUrl}>
				<MapPin class="h-4 w-4 shrink-0" />{cfg.address}
			</a>
		</div>
		<div class="text-sm">
			<div class="font-medium">{m('phone_label')}</div>
			<a href="tel:{cfg.contactPhone}" class="mt-1 inline-flex items-center gap-1.5 text-cocoa-500 hover:text-berry">
				<Phone class="h-4 w-4" />{cfg.contactPhone}
			</a>
			<div class="font-medium mt-3">{m('email_label')}</div>
			<a href="mailto:{cfg.contactEmail}" class="mt-1 inline-flex items-center gap-1.5 text-cocoa-500 hover:text-berry">
				<Mail class="h-4 w-4" />{cfg.contactEmail}
			</a>
		</div>
		<div class="text-sm">
			<div class="font-medium">Social</div>
			<a
				href="https://instagram.com/{cfg.instagramHandle}"
				target="_blank"
				rel="noreferrer"
				class="mt-1 inline-flex items-center gap-1.5 text-cocoa-500 hover:text-berry"
			>
				<Instagram class="h-4 w-4" />@{cfg.instagramHandle}
			</a>
		</div>
	</div>
	<p class="mx-auto mt-10 max-w-7xl text-xs text-cocoa-500">
		© {new Date().getFullYear()} Dagmar Carlssons Hembageri Eftr.
	</p>
</footer>
