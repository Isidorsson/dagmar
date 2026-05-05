import type { ParamMatcher } from '@sveltejs/kit';

const slugs = new Set(['tartor', 'kakor', 'brod', 'bakverk', 'annat']);

export const match: ParamMatcher = (param) => slugs.has(param);
