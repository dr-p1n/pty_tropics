(() => {
  'use strict';

  const DAYS = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];
  const HOURS_START = 6;
  const HOURS_END = 22;
  const WA_NUMBER = '50762940094';

  // --- State ---
  let currentWeekStart = getMonday(new Date());
  let bookedSlots = new Set();
  let selectedDuration = 1;

  // --- Init ---
  document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    fetchSlots();
    fetchEvents();
    initDurationPills();
    initForm();
    document.getElementById('prevWeek').addEventListener('click', () => changeWeek(-1));
    document.getElementById('nextWeek').addEventListener('click', () => changeWeek(1));
  });

  // --- Week helpers ---
  function getMonday(d) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    date.setDate(diff);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  function formatDate(d) {
    return d.toISOString().slice(0, 10);
  }

  function changeWeek(dir) {
    currentWeekStart.setDate(currentWeekStart.getDate() + dir * 7);
    renderGrid();
    fetchSlots();
  }

  function getWeekDates() {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(currentWeekStart);
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  }

  // --- Schedule Grid ---
  function renderGrid() {
    const grid = document.getElementById('scheduleGrid');
    const weekDates = getWeekDates();

    // Update label
    const start = weekDates[0];
    const end = weekDates[6];
    const fmt = (d) => d.toLocaleDateString('es-PA', { day: 'numeric', month: 'short' });
    document.getElementById('weekLabel').textContent = `${fmt(start)} — ${fmt(end)}`;

    // Build grid
    let html = '<div class="grid-header"></div>';
    weekDates.forEach((d, i) => {
      const dayNum = d.getDate();
      html += `<div class="grid-header">${DAYS[i]}<br><span style="color:#fff;font-size:13px">${dayNum}</span></div>`;
    });

    for (let h = HOURS_START; h < HOURS_END; h++) {
      const timeStr = String(h).padStart(2, '0') + ':00';
      html += `<div class="grid-time">${timeStr}</div>`;
      weekDates.forEach((d) => {
        const dateStr = formatDate(d);
        const key = `${dateStr}_${timeStr}`;
        const isPast = isSlotPast(d, h);
        const isBooked = bookedSlots.has(key);
        let state = 'available';
        let content = '●';
        if (isPast || isBooked) {
          state = 'booked';
          content = '—';
        }
        html += `<div class="grid-cell" data-state="${state}" data-date="${dateStr}" data-slot="${timeStr}">${content}</div>`;
      });
    }

    grid.innerHTML = html;

    // Bind clicks
    grid.querySelectorAll('.grid-cell[data-state="available"], .grid-cell[data-state="few"]').forEach(cell => {
      cell.addEventListener('click', () => selectSlot(cell.dataset.date, cell.dataset.slot));
    });
  }

  function isSlotPast(date, hour) {
    const now = new Date();
    const slotTime = new Date(date);
    slotTime.setHours(hour, 0, 0, 0);
    return slotTime < now;
  }

  function markFewSlots() {
    // Mark days with ≤3 remaining available slots as "few"
    const grid = document.getElementById('scheduleGrid');
    const cells = grid.querySelectorAll('.grid-cell[data-state="available"]');
    const countByDate = {};
    cells.forEach(cell => {
      const d = cell.dataset.date;
      countByDate[d] = (countByDate[d] || 0) + 1;
    });
    cells.forEach(cell => {
      if (countByDate[cell.dataset.date] <= 3) {
        cell.dataset.state = 'few';
        cell.textContent = '★';
      }
    });
  }

  // --- API: Fetch Slots ---
  async function fetchSlots() {
    try {
      const res = await fetch(`/api/slots?week=${formatDate(currentWeekStart)}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      bookedSlots = new Set(data.map(s => `${s.date}_${s.slot}`));
    } catch {
      // If API unavailable, show all as available (demo mode)
      bookedSlots = new Set();
    }
    renderGrid();
    markFewSlots();
  }

  // --- API: Fetch Events ---
  async function fetchEvents() {
    const container = document.getElementById('eventsList');
    try {
      const res = await fetch('/api/events');
      if (!res.ok) throw new Error();
      const events = await res.json();
      if (!events.length) return;
      container.innerHTML = events.map(ev => {
        const d = new Date(ev.date + 'T00:00:00');
        const day = d.getDate();
        const month = d.toLocaleDateString('es-PA', { month: 'short' }).toUpperCase();
        const badgeClass = { liga: 'badge-liga', torneo: 'badge-torneo', privado: 'badge-privado' }[ev.type] || 'badge-privado';
        const badgeLabel = ev.type.toUpperCase();
        return `
          <div class="card event-card">
            <div class="event-date">
              <span class="event-day">${day}</span>
              <span class="event-month">${month}</span>
            </div>
            <div class="event-info">
              <div class="event-name">${esc(ev.name)}</div>
              <div class="event-time">${esc(ev.timeRange)}${ev.notes ? ' · ' + esc(ev.notes) : ''}</div>
            </div>
            <span class="event-badge ${badgeClass}">${badgeLabel}</span>
          </div>`;
      }).join('');
    } catch {
      // Keep default empty message
    }
  }

  // --- Slot selection ---
  function selectSlot(date, slot) {
    document.getElementById('date').value = date;
    document.getElementById('slot').value = slot;
    document.getElementById('reservar').scrollIntoView({ behavior: 'smooth' });
  }

  // --- Duration pills ---
  function initDurationPills() {
    const pills = document.querySelectorAll('#durationPills .pill');
    const customWrap = document.getElementById('customDur');
    const customInput = document.getElementById('customHours');
    const hiddenInput = document.getElementById('duration');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const val = pill.dataset.dur;
        if (val === 'custom') {
          customWrap.classList.remove('hidden');
          selectedDuration = parseFloat(customInput.value) || 1;
          hiddenInput.value = selectedDuration;
        } else {
          customWrap.classList.add('hidden');
          selectedDuration = parseFloat(val);
          hiddenInput.value = selectedDuration;
        }
      });
    });

    customInput.addEventListener('input', () => {
      selectedDuration = parseFloat(customInput.value) || 1;
      hiddenInput.value = selectedDuration;
    });
  }

  // --- Form ---
  function initForm() {
    const form = document.getElementById('bookingForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();

      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const date = form.date.value;
      const slot = form.slot.value;
      const consent = form.consent.checked;
      let valid = true;

      if (!name) { showError('nameError', 'Ingresa tu nombre'); valid = false; }
      if (!phone) { showError('phoneError', 'Ingresa tu WhatsApp'); valid = false; }
      if (!date) { showError('dateError', 'Selecciona una fecha'); valid = false; }
      if (!slot) { showError('slotError', 'Selecciona una hora'); valid = false; }
      if (!consent) { showError('consentError', 'Debes aceptar el tratamiento de datos'); valid = false; }
      if (!valid) return;

      const btn = document.getElementById('submitBtn');
      btn.disabled = true;
      btn.textContent = 'ENVIANDO...';

      try {
        const res = await fetch('/api/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, date, slot, duration: selectedDuration, consent })
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Error al reservar');

        // Show success
        form.classList.add('hidden');
        const successEl = document.getElementById('bookingSuccess');
        successEl.classList.remove('hidden');
        document.getElementById('confirmationId').textContent = data.confirmationId;
        const msg = encodeURIComponent(`Hola, acabo de reservar en FUTGOLD.\nID: ${data.confirmationId}\nFecha: ${date}\nHora: ${slot}`);
        document.getElementById('whatsappLink').href = `https://wa.me/${WA_NUMBER}?text=${msg}`;

        // Refresh grid
        fetchSlots();
      } catch (err) {
        showError('consentError', err.message || 'Error de conexión. Intenta de nuevo.');
        btn.disabled = false;
        btn.textContent = 'CONFIRMAR RESERVA';
      }
    });
  }

  function showError(id, msg) {
    document.getElementById(id).textContent = msg;
  }

  function clearErrors() {
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
  }

  function esc(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
})();
