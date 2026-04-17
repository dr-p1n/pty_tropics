/**
 * POST /api/contact
 * Physical — Talent Booking Agency contact handler
 *
 * Expects JSON body:
 *   { name, email, company, message, consent }
 *
 * Stores to Google Sheets via API (same pattern as booking.js).
 * Env vars: GOOGLE_SHEETS_ID, GOOGLE_SERVICE_ACCOUNT_KEY (JSON string)
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await request.json();
    const { name, email, company, message, consent } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Campos requeridos: nombre, email, mensaje.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Consent required (Ley 81 Panama)
    if (!consent) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Se requiere el consentimiento de datos (Ley 81).' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Append to Google Sheets if configured
    if (env.GOOGLE_SHEETS_ID && env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      const sheetId = env.GOOGLE_SHEETS_ID;
      const serviceAccount = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_KEY);

      // Build JWT for Google Sheets API auth
      const token = await getAccessToken(serviceAccount);

      const range = 'Contactos!A:F';
      const values = [[
        new Date().toISOString(),
        name,
        email,
        company || '',
        message,
        consent ? 'Sí' : 'No',
      ]];

      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values }),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        console.error('[contact] Sheets API error:', err);
        // Non-fatal — still return success to client
      }
    }

    return new Response(
      JSON.stringify({ ok: true, message: '¡Gracias! Nos pondremos en contacto pronto.' }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (err) {
    console.error('[contact] Error:', err);
    return new Response(
      JSON.stringify({ ok: false, error: 'Error interno. Intenta de nuevo.' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
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

/* ── Google Service Account JWT ── */
async function getAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const header = { alg: 'RS256', typ: 'JWT' };
  const encode = (obj) => btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const headerB64 = encode(header);
  const claimB64 = encode(claim);
  const signingInput = `${headerB64}.${claimB64}`;

  // Import private key
  const keyData = serviceAccount.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\n/g, '');

  const binaryKey = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, encoder.encode(signingInput));
  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${signingInput}.${signatureB64}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}
