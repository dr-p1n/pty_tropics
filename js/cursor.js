/* cursor.js
   Floating thumbnail cursor follower for Visual Index items.
   Uses gsap.quickTo for 60fps position tracking. */

(function () {
  if (typeof gsap === 'undefined') {
    console.warn('[cursor] GSAP not found');
    return;
  }

  const follower = document.getElementById('cursor-follower');
  const img = follower ? follower.querySelector('img') : null;

  if (!follower || !img) return;

  // quickTo setters — reusable high-perf positional tweens
  const setX = gsap.quickTo(follower, 'x', { duration: 0.4, ease: 'power3.out' });
  const setY = gsap.quickTo(follower, 'y', { duration: 0.4, ease: 'power3.out' });

  let currentSrc = '';

  function moveCursor(e) {
    // Offset: float above and slightly right of pointer
    setX(e.clientX + 24);
    setY(e.clientY - 70);
  }

  function showFollower(thumbUrl) {
    if (thumbUrl && thumbUrl !== currentSrc) {
      img.src = thumbUrl;
      currentSrc = thumbUrl;
    }
    gsap.to(follower, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
    });
  }

  function hideFollower() {
    gsap.to(follower, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
    });
  }

  // Attach to Visual Index items
  const viItems = document.querySelectorAll('.vi-item[data-thumb]');

  viItems.forEach((item) => {
    const thumb = item.dataset.thumb;

    item.addEventListener('mouseenter', () => {
      showFollower(thumb);
    });

    item.addEventListener('mousemove', moveCursor);

    item.addEventListener('mouseleave', hideFollower);
  });

  // Hide on any scroll to avoid stale position
  window.addEventListener('scroll', hideFollower, { passive: true });
})();
