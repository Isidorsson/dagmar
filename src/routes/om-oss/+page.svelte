<script lang="ts">
	import { makeT } from '$lib/i18n';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);

	const history = {
		sv: {
			heading: 'Vår historia',
			body: [
				'Dagmar Carlssons Hembageri Eftr. grundades 1935 på Egna Hem i Trollhättan.',
				'1937 flyttade bageriet till Kungsgatan mitt inne i centrala Trollhättan.',
				'Jan Andersson (VD) började som lärling vid 16 års ålder, och tog sedan över verksamheten 2002 tillsammans med Susanne Karlsson.'
			]
		},
		en: {
			heading: 'Our story',
			body: [
				'Dagmar Carlssons Hembageri Eftr. was founded in 1935 in Egna Hem, Trollhättan.',
				'In 1937 the bakery moved to Kungsgatan in the heart of central Trollhättan.',
				'Jan Andersson (CEO) started as an apprentice at 16, and took over the bakery in 2002 together with Susanne Karlsson.'
			]
		}
	};

	const mission = {
		sv: {
			heading: 'Vår målsättning',
			body: [
				'Vår målsättning är att vara det flexibla kvartersbageriet för alla som uppskattar hantverk av hög kvalitet.',
				'Vi lägger stor vikt vid att tillverka bakverk utan tillsatser och med de bästa råvarorna.'
			]
		},
		en: {
			heading: 'Our mission',
			body: [
				'Our goal is to be the flexible neighbourhood bakery for everyone who values high-quality craftsmanship.',
				'We take great care to bake without additives, using the very best ingredients.'
			]
		}
	};

	type Member = {
		name: string;
		role: { sv: string; en: string };
		bio: { sv: string; en: string };
		photo: string;
	};

	const team: Member[] = [
		{
			name: 'Jan Andersson',
			role: { sv: 'VD & bagare', en: 'CEO & baker' },
			bio: {
				sv: 'Jan Andersson, född 1962, började på Dagmar Carlssons Hembageri Eftr. som lärling vid 16 års ålder. Efter 24 år inom företaget tog Jan sedan över Dagmar Carlssons Hembageri Eftr. tillsammans med Susanne Karlsson. Dem har nu tillsammans drivit företaget sedan 2002 och brinner för företaget och dess mål att vara det flexibla bageriet/konditoriet.',
				en: 'Jan Andersson, born 1962, joined Dagmar Carlssons as an apprentice at 16. After 24 years at the bakery he took over together with Susanne Karlsson. They have run the business since 2002 and share a passion for keeping it the flexible bakery and pastry shop it has always been.'
			},
			photo: 'https://api.dicebear.com/7.x/initials/svg?seed=Jan%20Andersson&backgroundColor=3a2418&textColor=f7efe2'
		},
		{
			name: 'Susanne Karlsson',
			role: { sv: 'Delägare & konditor', en: 'Co-owner & pastry chef' },
			bio: {
				sv: 'Susanne Karlsson, född 1964, började på Dagmar Carlssons Hembageri Eftr. år 2000. 2002 tog hon tillsammans med Jan Andersson över Dagmar Carlssons Hembageri Eftr.',
				en: 'Susanne Karlsson, born 1964, joined Dagmar Carlssons in 2000. In 2002 she took over the bakery together with Jan Andersson.'
			},
			photo: 'https://api.dicebear.com/7.x/initials/svg?seed=Susanne%20Karlsson&backgroundColor=a8324a&textColor=f7efe2'
		},
		{
			name: 'Marie Grunander',
			role: { sv: 'Konditor', en: 'Pastry chef' },
			bio: {
				sv: 'Marie Grunander, född 1970, började 1997 som lärling på Princess i Vänersborg. Efter ett år som lärling anställdes hon, och arbetade på Princess i 8 år. I oktober 2006 anställdes Marie som konditor på Dagmar Carlssons Hembageri Eftr. i Trollhättan.',
				en: 'Marie Grunander, born 1970, began as an apprentice at Princess in Vänersborg in 1997. After her apprenticeship she stayed on as a pastry chef for 8 years. In October 2006 Marie joined Dagmar Carlssons as pastry chef in Trollhättan.'
			},
			photo: 'https://api.dicebear.com/7.x/initials/svg?seed=Marie%20Grunander&backgroundColor=6e7f4a&textColor=f7efe2'
		}
	];

	const teamHeading = {
		sv: 'Vi som arbetar på Dagmar Carlssons Hembageri Eftr. i Trollhättan',
		en: 'The team at Dagmar Carlssons Hembageri Eftr. in Trollhättan'
	};
</script>

<svelte:head>
	<title>{m('nav_about')} — {m('site_name')}</title>
	<meta
		name="description"
		content={lang === 'sv'
			? 'Dagmar Carlssons Hembageri grundades 1935. Möt Jan, Susanne och Marie — bagarna bakom kvartersbageriet i Trollhättan.'
			: 'Dagmar Carlssons Bakery was founded in 1935. Meet Jan, Susanne and Marie — the bakers behind the neighbourhood bakery in Trollhättan.'}
	/>
</svelte:head>

<section class="bg-berry text-cream">
	<div class="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[5fr_7fr] md:py-20">
		<div class="overflow-hidden rounded-card shadow-card">
			<img
				src="https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=1000&q=80"
				alt={lang === 'sv' ? 'Inne i bageriet' : 'Inside the bakery'}
				class="h-full w-full object-cover"
			/>
		</div>
		<div class="space-y-8">
			<div>
				<h1 class="font-display text-3xl md:text-4xl">{history[lang].heading}</h1>
				<div class="mt-4 space-y-2 text-cream/90">
					{#each history[lang].body as line, i (i)}
						<p>{line}</p>
					{/each}
				</div>
			</div>
			<div>
				<h2 class="font-display text-2xl md:text-3xl">{mission[lang].heading}</h2>
				<div class="mt-3 space-y-2 text-cream/90">
					{#each mission[lang].body as line, i (i)}
						<p>{line}</p>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 py-16">
	<h2 class="border-b border-cream-200 pb-4 font-display text-2xl md:text-3xl">
		{teamHeading[lang]}
	</h2>

	<div class="mt-10 grid gap-8 md:grid-cols-3">
		{#each team as member (member.name)}
			<article class="card flex h-full flex-col overflow-hidden">
				<div class="aspect-[4/3] bg-cocoa">
					<img src={member.photo} alt={member.name} class="h-full w-full object-cover" />
				</div>
				<div class="flex flex-1 flex-col gap-2 p-5">
					<h3 class="font-display text-xl">{member.name}</h3>
					<p class="text-xs uppercase tracking-wide text-berry">{member.role[lang]}</p>
					<p class="mt-1 text-sm leading-relaxed text-cocoa-700">{member.bio[lang]}</p>
				</div>
			</article>
		{/each}
	</div>
</section>
