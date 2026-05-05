import type { ProductType } from './server/dummy';

export const PRODUCT_TYPES: ProductType[] = ['tarta', 'kaka', 'brod', 'bakverk', 'annat'];

const SLUG_BY_TYPE: Record<ProductType, string> = {
	tarta: 'tartor',
	kaka: 'kakor',
	brod: 'brod',
	bakverk: 'bakverk',
	annat: 'annat'
};

const TYPE_BY_SLUG: Record<string, ProductType> = {
	tartor: 'tarta',
	kakor: 'kaka',
	brod: 'brod',
	bakverk: 'bakverk',
	annat: 'annat'
};

export function slugForType(type: ProductType): string {
	return SLUG_BY_TYPE[type];
}

export function typeForSlug(slug: string): ProductType | null {
	return TYPE_BY_SLUG[slug] ?? null;
}

export type ProductTypeI18nKey =
	| 'producttype_tarta'
	| 'producttype_kaka'
	| 'producttype_brod'
	| 'producttype_bakverk'
	| 'producttype_annat';

export function i18nKeyForType(type: ProductType): ProductTypeI18nKey {
	return `producttype_${type}` as ProductTypeI18nKey;
}
