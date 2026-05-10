<script lang="ts">
	import { makeT } from '$lib/i18n';

	export let data;
	$: lang = data.lang;
	$: m = makeT(lang);

	const history = {
		sv: {
			heading: 'Lorem ipsum',
			body: [
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
				'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
			]
		},
		en: {
			heading: 'Lorem ipsum',
			body: [
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
				'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
			]
		}
	};

	const mission = {
		sv: {
			heading: 'Lorem ipsum',
			body: [
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
				'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'
			]
		},
		en: {
			heading: 'Lorem ipsum',
			body: [
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
				'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'
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
			name: 'Lorem Ipsum',
			role: { sv: 'Lorem ipsum', en: 'Lorem ipsum' },
			bio: {
				sv: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
				en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
			},
			photo: 'https://api.dicebear.com/7.x/initials/svg?seed=Lorem%20Ipsum&backgroundColor=3a2418&textColor=f7efe2'
		},
		{
			name: 'Dolor Sit',
			role: { sv: 'Lorem ipsum', en: 'Lorem ipsum' },
			bio: {
				sv: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
				en: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
			},
			photo: 'https://api.dicebear.com/7.x/initials/svg?seed=Dolor%20Sit&backgroundColor=a8324a&textColor=f7efe2'
		},
		{
			name: 'Amet Consectetur',
			role: { sv: 'Lorem ipsum', en: 'Lorem ipsum' },
			bio: {
				sv: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				en: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			},
			photo: 'https://api.dicebear.com/7.x/initials/svg?seed=Amet%20Consectetur&backgroundColor=6e7f4a&textColor=f7efe2'
		}
	];

	const teamHeading = {
		sv: 'Lorem ipsum dolor sit amet',
		en: 'Lorem ipsum dolor sit amet'
	};
</script>

<svelte:head>
	<title>{m('nav_about')} — {m('site_name')}</title>
	<meta
		name="description"
		content={lang === 'sv'
			? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
			: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
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
