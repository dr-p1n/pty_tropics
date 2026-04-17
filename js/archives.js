/* archives.js
   Filmstrip horizontal scroll with inertia.
   - Mouse wheel: accumulate velocity, RAF momentum decay
   - Pointer drag: click-drag with the same velocity system
   - Touch: swipe with velocity tracking
   - No GSAP Club required — uses gsap.set() for position */

(function () {
  if (typeof gsap === 'undefined') {
    console.warn('[archives] GSAP not found');
    return;
  }

  const viewport = document.querySelector('.filmstrip-viewport');
  const track = document.querySelector('.filmstrip-track');

  if (!viewport || !track) return;

  let translateX = 0;
  let velocity = 0;
  let rafId = null;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartTranslate = 0;
  let lastDragX = 0;
  let lastDragTime = 0;
  let dragVelocity = 0;

  const FRICTION = 0.93;
  const MIN_VELOCITY = 0.1;

  /* ── Track bounds ── */
  function getBounds() {
    const trackWidth = track.scrollWidth;
    const viewWidth = viewport.clientWidth;
    const maxScroll = -(trackWidth - viewWidth);
    return { min: maxScroll, max: 0 };
  }

  function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  /* ── RAF tick ── */
  function tick() {
    if (Math.abs(velocity) < MIN_VELOCITY) {
      velocity = 0;
      rafId = null;
      return;
    }

    const bounds = getBounds();
    translateX = clamp(translateX + velocity, bounds.min, bounds.max);
    gsap.set(track, { x: translateX });

    // Dampen velocity if hitting edge
    if (translateX === bounds.min || translateX === bounds.max) {
      velocity *= 0.7;
    } else {
      velocity *= FRICTION;
    }

    rafId = requestAnimationFrame(tick);
  }

  function startRAF() {
    if (!rafId) {
      rafId = requestAnimationFrame(tick);
    }
  }

  /* ── Mouse wheel ── */
  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    velocity += e.deltaY * 0.8;
    startRAF();
  }, { passive: false });

  /* ── Pointer drag ── */
  viewport.addEventListener('pointerdown', (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartTranslate = translateX;
    lastDragX = e.clientX;
    lastDragTime = performance.now();
    dragVelocity = 0;
    viewport.setPointerCapture(e.pointerId);

    // Cancel momentum
    velocity = 0;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    viewport.classList.add('grabbing');
  });

  viewport.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    const bounds = getBounds();
    translateX = clamp(dragStartTranslate + dx, bounds.min, bounds.max);
    gsap.set(track, { x: translateX });

    // Track velocity for momentum on release
    const now = performance.now();
    const dt = now - lastDragTime;
    if (dt > 0) {
      dragVelocity = ((e.clientX - lastDragX) / dt) * 16; // scale to ~60fps
    }
    lastDragX = e.clientX;
    lastDragTime = now;
  });

  viewport.addEventListener('pointerup', () => {
    if (!isDragging) return;
    isDragging = false;
    viewport.classList.remove('grabbing');

    // Transfer drag velocity to momentum
    velocity = dragVelocity;
    startRAF();
  });

  viewport.addEventListener('pointercancel', () => {
    isDragging = false;
    viewport.classList.remove('grabbing');
  });

  /* ── Touch ── */
  let touchStartX = 0;
  let touchLastX = 0;
  let touchLastTime = 0;

  viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchLastX = touchStartX;
    touchLastTime = performance.now();
    dragStartTranslate = translateX;
    velocity = 0;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    const x = e.touches[0].clientX;
    const dx = x - touchStartX;
    const bounds = getBounds();
    translateX = clamp(dragStartTranslate + dx, bounds.min, bounds.max);
    gsap.set(track, { x: translateX });

    const now = performance.now();
    const dt = now - touchLastTime;
    if (dt > 0) {
      dragVelocity = ((x - touchLastX) / dt) * 16;
    }
    touchLastX = x;
    touchLastTime = now;
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    velocity = dragVelocity;
    startRAF();
  }, { passive: true });

  /* ── Recalculate on resize ── */
  window.addEventListener('resize', () => {
    const bounds = getBounds();
    translateX = clamp(translateX, bounds.min, bounds.max);
    gsap.set(track, { x: translateX });
  }, { passive: true });
})();
