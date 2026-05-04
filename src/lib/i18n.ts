import sv from './i18n/messages/sv.json';
import en from './i18n/messages/en.json';

export type Lang = 'sv' | 'en';

const dict = { sv, en } as const;

type MsgKey = Exclude<keyof typeof sv, '$schema'>;

export function t(lang: Lang, key: MsgKey, vars?: Record<string, string | number>): string {
	const value = (dict[lang] as Record<string, string>)[key] ?? key;
	if (!vars) return value;
	return value.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

export function makeT(lang: Lang) {
	return (key: MsgKey, vars?: Record<string, string | number>) => t(lang, key, vars);
}
