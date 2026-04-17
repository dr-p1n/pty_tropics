/* index-section.js
   Visual Index hover interactions:
   - Border reveal on list items handled via CSS transitions
   - Staggered entrance animation for the list
   - Delegates cursor follower positioning to cursor.js via DOM events */

(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[index-section] GSAP not found');
    return;
  }

  const viList = document.querySelector('.vi-list');
  if (!viList) return;

  const items = viList.querySelectorAll('.vi-item');

  /* ── Staggered entrance animation ── */
  gsap.from(items, {
    opacity: 0,
    y: 15,
    duration: 0.6,
    stagger: 0.07,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#index',
      start: 'top 75%',
      once: true,
    },
  });

  /* ── Header reveal ── */
  const header = document.querySelector('#index header');
  if (header) {
    gsap.from(header, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#index',
        start: 'top 80%',
        once: true,
      },
    });
  }
})();
