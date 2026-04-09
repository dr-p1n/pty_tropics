export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const week = url.searchParams.get('week');

  if (!week || !/^\d{4}-\d{2}-\d{2}$/.test(week)) {
    return json({ error: 'Missing or invalid week param (YYYY-MM-DD)' }, 400);
  }

  const weekStart = new Date(week + 'T00:00:00Z');
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  try {
    const rows = await readSheet(env, 'Reservas');
    // Columns: Timestamp | Nombre | WhatsApp | Fecha | Hora | Duración | Estado | ConfirmationID
    const slots = rows
      .filter(row => {
        const fecha = row[3]; // Fecha column
        if (!fecha) return false;
        const d = new Date(fecha + 'T00:00:00Z');
        return d >= weekStart && d < weekEnd;
      })
      .filter(row => row[6] !== 'cancelled') // Skip cancelled
      .map(row => ({ date: row[3], slot: row[4] }));

    return json(slots);
  } catch (err) {
    return json({ error: 'Failed to fetch slots' }, 500);
  }
}

async function readSheet(env, sheetName) {
  const sheetId = env.GOOGLE_SHEETS_ID;
  const apiKey = env.GOOGLE_SHEETS_API_KEY;
  const range = encodeURIComponent(`${sheetName}!A2:H`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheets API ${res.status}`);
  const data = await res.json();
  return data.values || [];
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
