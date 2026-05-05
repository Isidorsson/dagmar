import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import {
	createProduct,
	deleteProduct,
	listProducts,
	updateProduct,
	type DummyProduct,
	type ProductType
} from '$lib/server/source';

const PRODUCT_TYPES: ProductType[] = ['tarta', 'kaka', 'brod', 'bakverk', 'annat'];
const CAKE_CATEGORIES = ['ordinarie', 'specialtarta', 'eget-motiv'] as const;
const DIETARY: DummyProduct['dietary'] = ['glutenfri', 'laktosfri', 'vegan', 'notfri'];

function parseProductType(raw: string): ProductType {
	return (PRODUCT_TYPES as string[]).includes(raw) ? (raw as ProductType) : 'tarta';
}

function parseCategory(raw: string): DummyProduct['category'] {
	return (CAKE_CATEGORIES as readonly string[]).includes(raw)
		? (raw as DummyProduct['category'])
		: undefined;
}

function parseOptionalNumber(raw: FormDataEntryValue | null): number | undefined {
	if (raw === null || raw === '') return undefined;
	const n = Number(raw);
	return Number.isFinite(n) ? n : undefined;
}

function parseOptionalString(raw: FormDataEntryValue | null): string | undefined {
	const s = String(raw ?? '').trim();
	return s ? s : undefined;
}

export const load: PageServerLoad = async () => {
	const products = await listProducts();
	return { products };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const f = await request.formData();
		const slug = String(f.get('slug') ?? '').trim();
		if (!slug) return fail(400, { error: 'slug required' });
		const productType = parseProductType(String(f.get('productType') ?? 'tarta'));
		await createProduct({
			slug,
			nameSv: String(f.get('nameSv') ?? ''),
			nameEn: String(f.get('nameEn') ?? ''),
			descSv: String(f.get('descSv') ?? ''),
			descEn: String(f.get('descEn') ?? ''),
			productType,
			category: productType === 'tarta' ? parseCategory(String(f.get('category') ?? '')) : undefined,
			priceFrom: Number(f.get('priceFrom') ?? 0) || 0,
			unitSv: parseOptionalString(f.get('unitSv')),
			unitEn: parseOptionalString(f.get('unitEn')),
			weightGrams: parseOptionalNumber(f.get('weightGrams')),
			stockCount: parseOptionalNumber(f.get('stockCount')),
			imageUrl: String(f.get('imageUrl') ?? ''),
			allergens: String(f.get('allergens') ?? '')
				.split(',')
				.map((s) => s.trim())
				.filter(Boolean),
			dietary: f.getAll('dietary').map(String).filter((d): d is DummyProduct['dietary'][number] => DIETARY.includes(d as DummyProduct['dietary'][number])),
			available: f.get('available') === 'on',
			featured: f.get('featured') === 'on'
		});
		return { ok: true };
	},
	update: async ({ request }) => {
		const f = await request.formData();
		const id = String(f.get('id') ?? '');
		const productType = parseProductType(String(f.get('productType') ?? 'tarta'));
		await updateProduct(id, {
			nameSv: String(f.get('nameSv') ?? ''),
			nameEn: String(f.get('nameEn') ?? ''),
			descSv: String(f.get('descSv') ?? ''),
			descEn: String(f.get('descEn') ?? ''),
			productType,
			category: productType === 'tarta' ? parseCategory(String(f.get('category') ?? '')) : undefined,
			priceFrom: Number(f.get('priceFrom') ?? 0) || 0,
			unitSv: parseOptionalString(f.get('unitSv')),
			unitEn: parseOptionalString(f.get('unitEn')),
			weightGrams: parseOptionalNumber(f.get('weightGrams')),
			stockCount: parseOptionalNumber(f.get('stockCount')),
			imageUrl: String(f.get('imageUrl') ?? ''),
			available: f.get('available') === 'on',
			featured: f.get('featured') === 'on'
		});
		return { ok: true };
	},
	delete: async ({ request }) => {
		const f = await request.formData();
		await deleteProduct(String(f.get('id') ?? ''));
		return { ok: true };
	}
};
