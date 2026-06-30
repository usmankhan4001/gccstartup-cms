export const config = {
  runtime: 'edge',
};

async function twentyCreate(env, path, payload) {
  if (!env.TWENTY_BASE_URL || !env.TWENTY_API_KEY) return null;
  try {
    const res = await fetch(`${env.TWENTY_BASE_URL}/rest/${path}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.TWENTY_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

const digits = (s) => String(s || '').replace(/[^\d]/g, '');

async function pushToTwenty(env, d) {
  if (!env.TWENTY_BASE_URL || !env.TWENTY_API_KEY) return { status: 'skipped' };
  const [firstName, ...rest] = String(d.name || '').trim().split(' ');
  const person = await twentyCreate(env, 'people', {
    name: { firstName: firstName || d.name || 'Website', lastName: rest.join(' ') || 'Lead' },
    emails: { primaryEmail: d.email || '' },
    phones: d.phone ? { primaryPhoneNumber: digits(d.phone) } : undefined,
    jobTitle: d.interest || '',
    city: d.country || '',
  });
  const personId = person?.data?.createPerson?.id || person?.data?.id || person?.id || null;
  if (!personId) return { status: 'failed' };

  const body = [
    `Interest: ${d.interest || '—'}`,
    `Country: ${d.country || '—'}`,
    `Phone: ${d.phone || '—'}`,
    `Email: ${d.email || '—'}`,
    `Source: ${d.source || '—'}`,
    `Page: ${d.page || '—'}`,
    '',
    d.message || '(no message)',
  ].join('\n');
  const note = await twentyCreate(env, 'notes', { title: `Website enquiry — ${d.name || 'Lead'}`, body });
  const noteId = note?.data?.id || note?.id;
  if (noteId && personId) await twentyCreate(env, 'noteTargets', { noteId, personId });
  return { status: 'success', id: personId };
}

const adminMessage = (d) => [
  '🟠 *New GCC Startup lead*',
  `*Name:* ${d.name || '—'}`,
  `*Email:* ${d.email || '—'}`,
  `*Phone:* ${d.phone || '—'}`,
  `*Country:* ${d.country || '—'}`,
  `*Needs:* ${d.interest || '—'}`,
  `*Message:* ${d.message || '—'}`,
  `*Source:* ${d.source || '—'}`,
].join('\n');

const leadMessage = (d) => {
  const first = String(d.name || '').trim().split(' ')[0] || 'there';
  return [
    `Hi ${first}, thanks for reaching out to *GCC Startup*! 👋`,
    '',
    `We’ve received your enquiry${d.country ? ` about *${d.country}*` : ''} and a specialist will reply within 24 hours.`,
    '',
    'If it’s urgent, just reply here on WhatsApp.',
  ].join('\n');
};

async function forwardToN8n(env, d) {
  if (!env.N8N_WEBHOOK_URL) return false;
  const payload = {
    leadChatId: d.phone ? `${digits(d.phone)}@c.us` : '',
    leadText: leadMessage(d),
    adminChatId: env.ADMIN_WHATSAPP ? `${digits(env.ADMIN_WHATSAPP)}@c.us` : '',
    adminText: adminMessage(d),
    notifyLead: env.NOTIFY_LEAD !== 'false' && Boolean(d.phone),
    lead: d,
  };
  try {
    const res = await fetch(env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

// Minimal SHA-256 for Meta CAPI in Edge
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function sendMetaCapi(env, d) {
  if (!env.META_PIXEL_ID || !env.META_ACCESS_TOKEN) return 'skipped';
  try {
    const userData = {};
    if (d.email) userData['em'] = await sha256(d.email);
    if (d.phone) userData['ph'] = await sha256(digits(d.phone));
    if (d.name) {
      const [first, ...rest] = d.name.trim().split(' ');
      if (first) userData['fn'] = await sha256(first);
      if (rest.length) userData['ln'] = await sha256(rest.join(' '));
    }
    if (d.clientIp) userData['client_ip_address'] = d.clientIp;
    if (d.userAgent) userData['client_user_agent'] = d.userAgent;
    if (d.fbclid) userData['fbc'] = `fb.1.${Date.now()}.${d.fbclid}`;

    const event = {
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: d.eventId || crypto.randomUUID(),
      action_source: 'website',
      event_source_url: d.page || '',
      user_data: userData,
      custom_data: {
        content_name: 'Tax Guide Download',
        content_category: d.source || 'Website Lead',
        currency: 'USD',
        value: 0,
      },
    };

    const body = { data: [event] };
    if (env.META_TEST_EVENT_CODE) body['test_event_code'] = env.META_TEST_EVENT_CODE;

    const res = await fetch(
      `https://graph.facebook.com/v19.0/${env.META_PIXEL_ID}/events?access_token=${env.META_ACCESS_TOKEN}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    );
    return res.ok ? 'success' : 'failed';
  } catch (e) {
    return 'failed';
  }
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const d = await req.json();
    if (!d.email && !d.phone) {
      return new Response(JSON.stringify({ error: 'Email or phone is required' }), { status: 400 });
    }

    // Capture envs depending on standard Edge (process.env) or Cloudflare env (if provided)
    // Here we'll use process.env to support Vercel Edge / Node
    const env = process.env || {};
    
    // Set client details
    d.clientIp = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || '';
    d.userAgent = req.headers.get('user-agent') || '';

    // Fire all integrations without waiting for all to complete if not necessary,
    // but in a serverless function we must await to ensure they complete before response
    await Promise.all([
      pushToTwenty(env, d),
      sendMetaCapi(env, d),
      forwardToN8n(env, d)
    ]);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

// Cloudflare Pages / Workers handler export
export async function onRequestPost(context) {
  const req = context.request;
  const env = context.env;
  
  try {
    const d = await req.json();
    if (!d.email && !d.phone) {
      return new Response(JSON.stringify({ error: 'Email or phone is required' }), { status: 400 });
    }

    d.clientIp = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || '';
    d.userAgent = req.headers.get('user-agent') || '';

    await Promise.all([
      pushToTwenty(env, d),
      sendMetaCapi(env, d),
      forwardToN8n(env, d)
    ]);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
