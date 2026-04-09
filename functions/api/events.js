export async function onRequestGet(context) {
  const { env } = context;

  try {
    const rows = await readSheet(env, 'Eventos');
    // Columns: Fecha | Nombre | HoraInicio | HoraFin | Notas | Tipo
    const today = new Date().toISOString().slice(0, 10);

    const events = rows
      .filter(row => row[0] && row[0] >= today)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(row => ({
        date: row[0],
        name: row[1] || '',
        timeRange: `${row[2] || ''} – ${row[3] || ''}`,
        notes: row[4] || '',
        type: (row[5] || 'privado').toLowerCase(),
      }));

    return json(events);
  } catch {
    return json({ error: 'Failed to fetch events' }, 500);
  }
}

async function readSheet(env, sheetName) {
  const sheetId = env.GOOGLE_SHEETS_ID;
  const apiKey = env.GOOGLE_SHEETS_API_KEY;
  const range = encodeURIComponent(`${sheetName}!A2:F`);
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
