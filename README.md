# FUTGOLD — Cancha Sintética · Panama City

Booking website for FUTGOLD synthetic soccer field. Static HTML/CSS/JS on Cloudflare Pages with Google Sheets as the backend.

## Stack

- **Frontend:** HTML + CSS + vanilla JS (no framework)
- **API:** Cloudflare Pages Functions (`functions/api/`)
- **Database:** Google Sheets
- **Deploy:** GitHub → Cloudflare Pages (auto on push to `main`)

## Google Sheets Setup

1. Create a Google Sheet with two tabs:

   **Tab: `Reservas`** — Row 1 headers:
   | Timestamp | Nombre | WhatsApp | Fecha | Hora | Duración | Estado | ConfirmationID |
   |-----------|--------|----------|-------|------|----------|--------|----------------|

   **Tab: `Eventos`** — Row 1 headers:
   | Fecha | Nombre | HoraInicio | HoraFin | Notas | Tipo |
   |-------|--------|------------|---------|-------|------|

   - `Tipo` values: `liga`, `torneo`, `privado`

2. Go to [Google Cloud Console](https://console.cloud.google.com/):
   - Create a project (or use an existing one)
   - Enable **Google Sheets API**
   - Create an **API key** (restrict to Sheets API)

3. Make the Google Sheet **publicly readable** (Share → Anyone with the link → Viewer)

> **Note:** The API key approach supports reading and appending rows. For production with high traffic, consider migrating to a Service Account with OAuth.

## Environment Variables

Set these in Cloudflare Pages → Settings → Environment variables:

```
GOOGLE_SHEETS_API_KEY=your-api-key
GOOGLE_SHEETS_ID=your-sheet-id
```

The Sheet ID is the long string in the Google Sheets URL:
`https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`

## Local Development

Serve the static files locally:

```bash
npx wrangler pages dev . --port 8788
```

This runs both the static site and the Pages Functions locally.

## Deploy to Cloudflare Pages

1. Connect the GitHub repo (`dr-p1n/pty_tropics`) to Cloudflare Pages
2. Build settings:
   - **Build command:** (leave empty — no build step)
   - **Build output directory:** `/` (root)
3. Add environment variables (`GOOGLE_SHEETS_API_KEY`, `GOOGLE_SHEETS_ID`)
4. Push to `main` → auto-deploys

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/slots?week=YYYY-MM-DD` | Returns booked slots for the week |
| POST | `/api/booking` | Creates a new booking |
| GET | `/api/events` | Returns upcoming events |

### POST /api/booking body

```json
{
  "name": "Juan",
  "phone": "6294-0094",
  "date": "2025-04-12",
  "slot": "08:00",
  "duration": 1,
  "consent": true
}
```

## Adding Events

Add rows directly in the Google Sheet `Eventos` tab. They'll appear on the site automatically.

## Ley 81 Compliance

- Consent checkbox required before booking
- Privacy notice in footer
- Data used only for booking management
