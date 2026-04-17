/* casting.js
   - Toggle .selected on talent cards
   - Show/hide glassmorphism casting bar
   - Export PDF via window.print()
   - Generate share link via URL fragment
   - Restore pre-selected cards from URL hash on load */

(function () {
  if (typeof gsap === 'undefined') {
    console.warn('[casting] GSAP not found');
    return;
  }

  const grid = document.querySelector('.casting-grid');
  const bar = document.getElementById('casting-bar');
  const countEl = bar ? bar.querySelector('.casting-bar__count strong') : null;
  const btnPDF = document.getElementById('btn-pdf');
  const btnShare = document.getElementById('btn-share');
  const btnClear = document.getElementById('btn-clear');

  if (!grid || !bar) return;

  let selected = new Set();
  let barVisible = false;

  /* ── Restore from URL hash ── */
  function restoreFromHash() {
    const hash = location.hash;
    const match = hash.match(/^#casting=(.+)$/);
    if (!match) return;
    const ids = match[1].split(',').map((s) => s.trim()).filter(Boolean);
    ids.forEach((id) => {
      const card = grid.querySelector(`[data-id="${id}"]`);
      if (card) selectCard(card, true);
    });
  }

  /* ── Select / deselect ── */
  function selectCard(card, force) {
    const id = card.dataset.id;
    const willSelect = force !== undefined ? force : !selected.has(id);

    if (willSelect) {
      selected.add(id);
      card.classList.add('selected');
    } else {
      selected.delete(id);
      card.classList.remove('selected');
    }
    updateBar();
  }

  function updateBar() {
    const count = selected.size;

    if (countEl) {
      countEl.textContent = count;
    }

    if (count > 0 && !barVisible) {
      barVisible = true;
      gsap.to(bar, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
    } else if (count === 0 && barVisible) {
      barVisible = false;
      gsap.to(bar, {
        y: 120,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      });
    }
  }

  /* ── Click handler on grid (event delegation) ── */
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.talent-card');
    if (!card) return;
    selectCard(card);
  });

  /* ── Export PDF ── */
  if (btnPDF) {
    btnPDF.addEventListener('click', () => {
      if (selected.size === 0) return;
      window.print();
    });
  }

  /* ── Generate & copy share link ── */
  if (btnShare) {
    btnShare.addEventListener('click', () => {
      if (selected.size === 0) return;
      const ids = Array.from(selected).join(',');
      const url = `${location.origin}${location.pathname}#casting=${ids}`;
      navigator.clipboard.writeText(url).then(() => {
        const orig = btnShare.textContent;
        btnShare.textContent = 'Copiado ✓';
        setTimeout(() => {
          btnShare.textContent = orig;
        }, 2000);
      }).catch(() => {
        // Fallback: update URL bar
        history.replaceState(null, '', `#casting=${ids}`);
      });
    });
  }

  /* ── Clear selection ── */
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      selected.forEach((id) => {
        const card = grid.querySelector(`[data-id="${id}"]`);
        if (card) card.classList.remove('selected');
      });
      selected.clear();
      updateBar();
      history.replaceState(null, '', location.pathname);
    });
  }

  /* ── Init ── */
  restoreFromHash();
})();
