/* hero.js
   - Ken Burns still → video crossfade on canplaythrough
   - Masthead shrink: ScrollTrigger scrub 0→200px scroll
   - Nav logo + links fade in as masthead fades out */

(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[hero] GSAP not found');
    return;
  }

  /* ── Reveal nav container immediately ── */
  const nav = document.getElementById('nav');
  if (nav) {
    // Show nav shell (it stays transparent until scroll)
    nav.classList.add('is-visible');
  }

  /* ── Video crossfade ── */
  const video = document.querySelector('.hero__video');
  const still = document.querySelector('.hero__still');

  if (video && still) {
    video.addEventListener('canplaythrough', () => {
      gsap.to(still, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut',
      });
      gsap.to(video, {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.inOut',
      });
    }, { once: true });
  }

  /* ── Masthead → Nav transition ── */
  const masthead = document.querySelector('.hero__masthead');
  const navLogo = document.querySelector('.nav__logo');
  const navLinks = document.querySelector('.nav__links');

  if (!masthead || !navLogo || !navLinks) return;

  // ScrollTrigger scrub: as user scrolls 0 → 200px,
  // masthead fades out and nav logo + links fade in
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: '+=200',
      scrub: 0.6,
    },
  });

  // Phase 1 (0–60%): masthead fades + lifts
  tl.to(
    masthead,
    {
      opacity: 0,
      y: -30,
      ease: 'power2.in',
      duration: 0.6,
    },
    0
  );

  // Phase 2 (40–100%): nav elements appear
  tl.to(
    navLogo,
    {
      opacity: 1,
      ease: 'power2.out',
      duration: 0.4,
    },
    0.4
  )
    .to(
      navLinks,
      {
        opacity: 1,
        ease: 'power2.out',
        duration: 0.4,
      },
      0.5
    );

  // On scroll back to top, re-show masthead and hide nav text
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    onLeaveBack: () => {
      navLogo.classList.remove('is-visible');
      navLinks.classList.remove('is-visible');
    },
  });
})();
