import { env } from '$env/dynamic/private';

type Mail = { to: string; subject: string; html: string };

export async function sendMail(mail: Mail) {
	if (!env.RESEND_API_KEY || !env.OWNER_EMAIL) {
		console.log('[email:demo]', mail.subject, '→', mail.to);
		console.log(mail.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300));
		return { ok: true, demo: true };
	}
	try {
		const { Resend } = await import('resend');
		const resend = new Resend(env.RESEND_API_KEY);
		await resend.emails.send({
			from: 'Lorem Ipsum Bakery <orders@example.com>',
			to: mail.to,
			subject: mail.subject,
			html: mail.html
		});
		return { ok: true };
	} catch (err) {
		console.error('[email] send failed:', err);
		return { ok: false };
	}
}

export function customOrderEmail(order: {
	customerName: string;
	email: string;
	phone: string;
	desiredDate: string;
	occasion: string;
	designNotes: string;
	allergens: string;
	servings: number;
}) {
	return `
		<h2>Ny tårtbeställning</h2>
		<p><strong>Från:</strong> ${escape(order.customerName)} (${escape(order.email)}, ${escape(order.phone)})</p>
		<p><strong>Datum:</strong> ${escape(order.desiredDate)}</p>
		<p><strong>Tillfälle:</strong> ${escape(order.occasion)}</p>
		<p><strong>Portioner:</strong> ${order.servings}</p>
		<p><strong>Allergier:</strong> ${escape(order.allergens) || '–'}</p>
		<h3>Beskrivning</h3>
		<p>${escape(order.designNotes).replace(/\n/g, '<br/>')}</p>
	`;
}

function escape(s: string) {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}
