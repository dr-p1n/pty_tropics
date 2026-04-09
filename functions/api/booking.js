export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const { name, phone, date, slot, duration, consent } = body;

  // Validate
  if (!name || typeof name !== 'string' || !name.trim()) {
    return json({ success: false, error: 'Nombre es requerido' }, 400);
  }
  if (!phone || typeof phone !== 'string' || !phone.trim()) {
    return json({ success: false, error: 'WhatsApp es requerido' }, 400);
  }
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return json({ success: false, error: 'Fecha inválida' }, 400);
  }
  if (!slot || !/^\d{2}:\d{2}$/.test(slot)) {
    return json({ success: false, error: 'Hora inválida' }, 400);
  }
  const dur = parseFloat(duration);
  if (!dur || dur < 1 || dur > 8) {
    return json({ success: false, error: 'Duración inválida (1-8 horas)' }, 400);
  }
  if (!consent) {
    return json({ success: false, error: 'Consentimiento Ley 81 requerido' }, 400);
  }

  const confirmationId = 'FG-' + generateId();
  const timestamp = new Date().toISOString();

  try {
    await appendRow(env, 'Reservas', [
      timestamp,
      name.trim(),
      phone.trim(),
      date,
      slot,
      dur.toString(),
      'pending',
      confirmationId,
    ]);
    return json({ success: true, confirmationId });
  } catch (err) {
    return json({ success: false, error: 'Error al guardar la reserva' }, 500);
  }
}

function generateId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 4; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

async function appendRow(env, sheetName, row) {
  const sheetId = env.GOOGLE_SHEETS_ID;
  const apiKey = env.GOOGLE_SHEETS_API_KEY;
  const range = encodeURIComponent(`${sheetName}!A:H`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW&key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: [row] }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sheets append failed: ${res.status} ${text}`);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
