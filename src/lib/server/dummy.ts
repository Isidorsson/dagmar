/**
 * Demo data — used when external services (Convex, Google Places, Resend, Clerk) are not configured.
 * Lets the site run end-to-end with zero API keys for preview / hand-off.
 * In production, set the env vars in `.env.example` and the source switch in `source.ts`
 * will automatically swap each fallback for the real integration.
 */

export type DummyCake = {
	_id: string;
	slug: string;
	nameSv: string;
	nameEn: string;
	descSv: string;
	descEn: string;
	category: 'ordinarie' | 'specialtarta' | 'eget-motiv';
	priceFrom: number;
	imageUrl: string;
	allergens: string[];
	dietary: ('glutenfri' | 'laktosfri' | 'vegan' | 'notfri')[];
	available: boolean;
	featured: boolean;
	sortOrder: number;
};

export const dummyCakes: DummyCake[] = [
	{
		_id: 'demo-1',
		slug: 'prinsesstarta',
		nameSv: 'Prinsesstårta',
		nameEn: 'Princess cake',
		descSv: 'Klassisk svensk prinsesstårta med vaniljkräm, hallonsylt och grön marsipan.',
		descEn: 'Classic Swedish princess cake with vanilla cream, raspberry jam and green marzipan.',
		category: 'ordinarie',
		priceFrom: 320,
		imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=900&q=80',
		allergens: ['ägg', 'vete', 'mjölk', 'mandel'],
		dietary: [],
		available: true,
		featured: true,
		sortOrder: 1
	},
	{
		_id: 'demo-2',
		slug: 'kladdkaka',
		nameSv: 'Kladdkaka',
		nameEn: 'Sticky chocolate cake',
		descSv: 'Krämig kladdkaka med mörk choklad och flagsalt. Serveras med vispad grädde.',
		descEn: 'Gooey sticky chocolate cake with dark chocolate and flake salt. Served with whipped cream.',
		category: 'ordinarie',
		priceFrom: 180,
		imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=900&q=80',
		allergens: ['ägg', 'vete', 'mjölk'],
		dietary: [],
		available: true,
		featured: true,
		sortOrder: 2
	},
	{
		_id: 'demo-3',
		slug: 'gluten-fri-citron',
		nameSv: 'Glutenfri citrontårta',
		nameEn: 'Gluten-free lemon cake',
		descSv: 'Frisk citrontårta utan gluten, med lemon curd och maräng.',
		descEn: 'Fresh gluten-free lemon cake with curd and meringue.',
		category: 'specialtarta',
		priceFrom: 380,
		imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=900&q=80',
		allergens: ['ägg', 'mjölk'],
		dietary: ['glutenfri'],
		available: true,
		featured: true,
		sortOrder: 3
	},
	{
		_id: 'demo-4',
		slug: 'eget-motiv-foto',
		nameSv: 'Tårta med fototryck',
		nameEn: 'Photo-print cake',
		descSv: 'Skicka in din bild — vi trycker den på en tårta du själv designar.',
		descEn: 'Send us your image — we print it on a cake you design yourself.',
		category: 'eget-motiv',
		priceFrom: 450,
		imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=80',
		allergens: ['ägg', 'vete', 'mjölk'],
		dietary: [],
		available: true,
		featured: true,
		sortOrder: 4
	},
	{
		_id: 'demo-5',
		slug: 'vegansk-chokladtarta',
		nameSv: 'Vegansk chokladtårta',
		nameEn: 'Vegan chocolate cake',
		descSv: 'Helt växtbaserad, fyllig chokladtårta med hallonganache.',
		descEn: 'Fully plant-based, rich chocolate cake with raspberry ganache.',
		category: 'specialtarta',
		priceFrom: 360,
		imageUrl: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=900&q=80',
		allergens: ['vete', 'soja'],
		dietary: ['vegan', 'laktosfri'],
		available: true,
		featured: false,
		sortOrder: 5
	},
	{
		_id: 'demo-6',
		slug: 'budapest',
		nameSv: 'Budapestbakelse',
		nameEn: 'Budapest roll',
		descSv: 'Frasig hasselnötsmaräng rullad runt vispad grädde och apelsin.',
		descEn: 'Crispy hazelnut meringue rolled around whipped cream and orange.',
		category: 'ordinarie',
		priceFrom: 240,
		imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=80',
		allergens: ['ägg', 'mjölk', 'hasselnöt'],
		dietary: ['glutenfri'],
		available: true,
		featured: false,
		sortOrder: 6
	}
];

export type DummyReview = {
	authorName: string;
	rating: number;
	text: string;
	relativeTime: string;
	profilePhotoUrl?: string;
};

export const dummyReviews: DummyReview[] = [
	{
		authorName: 'Anna Lindberg',
		rating: 5,
		text: 'Bästa prinsesstårtan i Trollhättan! Personalen är otroligt trevlig och tårtorna smakar som hos farmor.',
		relativeTime: 'för 2 veckor sedan'
	},
	{
		authorName: 'Mikael Johansson',
		rating: 5,
		text: 'Beställde en tårta med eget motiv till min dotters dop — överträffade alla förväntningar. Ren konst!',
		relativeTime: 'för en månad sedan'
	},
	{
		authorName: 'Sara Eriksson',
		rating: 5,
		text: 'Glutenfria tårtorna är fantastiska. Äntligen ett bageri som tar allergier på allvar utan att kompromissa med smaken.',
		relativeTime: 'för 3 veckor sedan'
	},
	{
		authorName: 'Lars Pettersson',
		rating: 4,
		text: 'Trevligt litet hembageri med klassisk känsla. Kladdkakan är värd ett besök i sig.',
		relativeTime: 'för 2 månader sedan'
	},
	{
		authorName: 'Emma Nilsson',
		rating: 5,
		text: 'Har anlitat dem till bröllop, dop och födelsedagar. Alltid lika fantastiskt resultat. Kan rekommenderas!',
		relativeTime: 'för 1 vecka sedan'
	}
];

export const dummyHours = [
	{ weekday: 0, openTime: '', closeTime: '', closed: true },
	{ weekday: 1, openTime: '06:00', closeTime: '17:00', closed: false },
	{ weekday: 2, openTime: '06:00', closeTime: '17:00', closed: false },
	{ weekday: 3, openTime: '06:00', closeTime: '17:00', closed: false },
	{ weekday: 4, openTime: '06:00', closeTime: '17:00', closed: false },
	{ weekday: 5, openTime: '06:00', closeTime: '17:00', closed: false },
	{ weekday: 6, openTime: '08:00', closeTime: '14:00', closed: false }
];

export const dummyHolidays = [
	{
		_id: 'h1',
		date: '2026-06-19',
		labelSv: 'Midsommarafton',
		labelEn: 'Midsummer Eve',
		closed: true
	},
	{
		_id: 'h2',
		date: '2026-12-24',
		labelSv: 'Julafton',
		labelEn: 'Christmas Eve',
		closed: false,
		openTime: '06:00',
		closeTime: '12:00'
	}
];

export const dummyNews = [
	{
		_id: 'n1',
		titleSv: 'Sommarspecial: Jordgubbstårtor',
		titleEn: 'Summer special: strawberry cakes',
		bodySv: 'Färska svenska jordgubbar är här! Beställ vår säsongsspecial fram till 15 augusti.',
		bodyEn: 'Fresh Swedish strawberries are here! Order our seasonal special until August 15.',
		imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=80',
		publishedAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
		pinned: true
	}
];

export const dummySiteConfig = {
	googlePlaceId: '',
	instagramHandle: 'dagmarcarlssons',
	contactPhone: '0520-10671',
	contactEmail: 'info@dagmarcarlssons.se',
	address: 'Kungsgatan 16, 461 31 Trollhättan',
	mapEmbedUrl:
		'https://www.google.com/maps/embed/v1/place?key=DEMO&q=Kungsgatan+16,+Trollh%C3%A4ttan'
};

export const dummyCustomOrders = [
	{
		_id: 'o1',
		customerName: 'Lisa Bergström',
		email: 'lisa@example.com',
		phone: '070-1234567',
		desiredDate: '2026-05-20',
		occasion: '50-årsfest',
		designNotes: 'Stor tårta med rosa rosor och guldfärgad text "Grattis Mona 50!"',
		referenceImageUrl: null,
		allergens: 'Inga',
		servings: 30,
		status: 'new' as const,
		createdAt: Date.now() - 1000 * 60 * 60 * 6
	},
	{
		_id: 'o2',
		customerName: 'Johan Karlsson',
		email: 'johan@example.com',
		phone: '073-9876543',
		desiredDate: '2026-05-15',
		occasion: 'Examen',
		designNotes: 'Studentmössa i marsipan, vit grund med blåbär.',
		referenceImageUrl: null,
		allergens: 'Glutenfri tack',
		servings: 12,
		status: 'seen' as const,
		createdAt: Date.now() - 1000 * 60 * 60 * 30
	}
];
