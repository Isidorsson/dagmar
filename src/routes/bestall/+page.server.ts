import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { createCustomOrder } from '$lib/server/source';
import { sendMail, customOrderEmail } from '$lib/server/email';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ url }) => {
	return { presetCake: url.searchParams.get('cake') };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const customerName = String(form.get('customerName') ?? '').trim();
		const email = String(form.get('email') ?? '').trim();
		const phone = String(form.get('phone') ?? '').trim();
		const desiredDate = String(form.get('desiredDate') ?? '').trim();
		const occasion = String(form.get('occasion') ?? '').trim();
		const designNotes = String(form.get('designNotes') ?? '').trim();
		const allergens = String(form.get('allergens') ?? '').trim();
		const servings = Number(form.get('servings') ?? 0);

		const errors: Record<string, string> = {};
		if (!customerName) errors.customerName = 'required';
		if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'invalid';
		if (!phone) errors.phone = 'required';
		if (!desiredDate) errors.desiredDate = 'required';
		if (!designNotes || designNotes.length > 4000) errors.designNotes = 'invalid';
		if (!servings || servings < 1 || servings > 200) errors.servings = 'invalid';

		if (Object.keys(errors).length) {
			return fail(400, { errors, values: { customerName, email, phone, desiredDate, occasion, designNotes, allergens, servings } });
		}

		const order = await createCustomOrder({
			customerName,
			email,
			phone,
			desiredDate,
			occasion,
			designNotes,
			allergens,
			servings
		});

		await sendMail({
			to: env.OWNER_EMAIL ?? 'demo@example.com',
			subject: `Ny tårtbeställning från ${customerName}`,
			html: customOrderEmail(order)
		});

		return { success: true };
	}
};
