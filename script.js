document.addEventListener('DOMContentLoaded', () => {
  /* ---------- AUTO YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- LOADER HIDE ON LOAD ---------- */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  });

  /* ---------- SMOOTH SCROLL FOR IN-PAGE LINKS ---------- */
  document.querySelectorAll('a[href^="#"], .scroll-link').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      if (!href.startsWith('#')) return; // skip external

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------- FADE-IN ON SCROLL ---------- */
  const faders = document.querySelectorAll('.fade-section');
  if (faders.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    faders.forEach(f => observer.observe(f));
  }

  /* ---------- PARALLAX HERO ---------- */
  const hero = document.querySelector('.parallax');
  if (hero) {
    window.addEventListener('scroll', () => {
      const offset = window.pageYOffset;
      hero.style.backgroundPositionY = `${65 - offset * 0.03}%`;
    });
  }

  /* ---------- LIGHTBOX ---------- */
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src) {
    if (!lightboxOverlay || !lightboxImage) return;
    lightboxImage.src = src;
    lightboxOverlay.classList.add('active');
  }

  function closeLightbox() {
    if (!lightboxOverlay || !lightboxImage) return;
    lightboxOverlay.classList.remove('active');
    lightboxImage.src = '';
  }

  document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.addEventListener('click', () => {
      const full = img.getAttribute('data-full') || img.getAttribute('src');
      if (full) openLightbox(full);
    });
  });

  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', e => {
      if (e.target === lightboxOverlay) closeLightbox();
    });
  }
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- TIMELINE INTERACTION ---------- */
  document.querySelectorAll('.timeline-step').forEach(step => {
    const btn = step.querySelector('.timeline-label');
    if (!btn) return;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.timeline-step').forEach(s => {
        if (s !== step) s.classList.remove('active');
      });
      step.classList.toggle('active');
    });
  });

  /* ---------- MUSIC PLAYER ---------- */
  const audio = document.getElementById('audioPlayer');
  const titleSpan = document.getElementById('trackTitle');
  const trackButtons = document.querySelectorAll('.track-btn');

  if (audio && titleSpan && trackButtons.length) {
    trackButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const src = btn.getAttribute('data-src');
        const title = btn.getAttribute('data-title') || 'Unknown Track';
        if (!src) return;

        // set all inactive
        trackButtons.forEach(b => b.classList.remove('active'));

        // activate this one
        btn.classList.add('active');
        audio.src = src;
        titleSpan.textContent = title;
        audio.play().catch(() => {
          // autoplay might be blocked; user can press play manually
        });
      });
    });
  }

  /* ---------- SIMPLE MODAL (OPTIONAL) ---------- */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalCloseBtn = document.querySelector('.modal-close');

  // Example: open modal automatically after some time on the home page
  if (modalOverlay && window.location.pathname.endsWith('index.html')) {
    setTimeout(() => {
      modalOverlay.classList.add('active');
    }, 8000); // show after 8 seconds
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      if (modalOverlay) modalOverlay.classList.remove('active');
    });
  }
});
