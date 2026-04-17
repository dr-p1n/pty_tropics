/* scroll-animations.js
   GSAP ScrollTrigger — reveal batches + parallax
   Runs after GSAP + ScrollTrigger are loaded via CDN */

(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[scroll-animations] GSAP or ScrollTrigger not found');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Smooth scroll normalization (iOS + touch)
  ScrollTrigger.normalizeScroll(true);

  /* ── Batch reveal for .reveal elements ── */
  ScrollTrigger.batch('.reveal', {
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        overwrite: true,
      }),
    onEnterBack: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        overwrite: true,
      }),
    start: 'top 88%',
    once: false,
  });

  /* ── Overlapping section parallax ── */
  const bgText = document.querySelector('.overlap-section__bg-text');
  if (bgText) {
    gsap.to(bgText, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#overlapping',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  /* ── Portrait subtle parallax ── */
  const portrait = document.querySelector('.overlap-section__portrait img');
  if (portrait) {
    gsap.to(portrait, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: '#overlapping',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
})();
