/* ══════════════════════════════════════════
   ADITYA DORWAL — PORTFOLIO SCRIPT
   ══════════════════════════════════════════ */

// ─── CONFIG ────────────────────────────────────────────────────────────────
// TO MAKE THE CONTACT FORM ACTUALLY SEND EMAILS:
//   1. Go to https://formspree.io → Create free account → New Form
//   2. Copy your endpoint (e.g. "https://formspree.io/f/xyzabcde")
//   3. Replace the empty string below with your endpoint
//   4. That's it — no backend code needed!
//
// Alternative: Use Netlify Forms (add data-netlify="true" to the <form> tag)
// Alternative: Use EmailJS (https://www.emailjs.com)
const FORM_ENDPOINT = ''; // 👈 Paste your Formspree / EmailJS endpoint here

document.addEventListener('DOMContentLoaded', () => {

  // ─── MOBILE HAMBURGER ──────────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const overlay   = createOverlay();

  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    overlay.classList.toggle('visible', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  overlay.addEventListener('click', closeMenu);

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  function createOverlay() {
    const el = document.createElement('div');
    el.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.5);
      z-index:997;display:none;transition:opacity .3s;
    `;
    el.classList.add('nav-overlay');
    document.body.appendChild(el);
    const style = document.createElement('style');
    style.textContent = '.nav-overlay.visible{display:block!important;}';
    document.head.appendChild(style);
    return el;
  }

  // ─── STICKY HEADER ─────────────────────────────────────────────────────
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  // ─── SCROLL TO TOP ─────────────────────────────────────────────────────
  const scrollTopBtn = document.getElementById('scrollTop');
  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ─── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });

  // ─── INTERSECTION OBSERVER — REVEAL ────────────────────────────────────
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger cards slightly
        const delay = entry.target.closest('.projects-container')
          ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 60
          : 0;
        setTimeout(() => entry.target.classList.add('in-view'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .timeline-item')
    .forEach(el => revealObserver.observe(el));

  // ─── SKILL BARS ────────────────────────────────────────────────────────
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-progress-bar').forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.getAttribute('data-width') + '%';
          }, i * 100);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

  // ─── PROJECT FILTER ────────────────────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        if (match) {
          card.classList.remove('hidden');
          card.style.opacity = '1';
          card.style.transform = '';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => card.classList.add('hidden'), 300);
        }
      });
    });
  });

  // ─── CONTACT FORM ──────────────────────────────────────────────────────
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validateForm()) return;

      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Sending…';

      if (FORM_ENDPOINT) {
        // Real submission via Formspree (or similar)
        try {
          const data = new FormData(form);
          const res  = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
          });
          if (res.ok) {
            showSuccess();
          } else {
            throw new Error('Server error');
          }
        } catch (err) {
          submitBtn.querySelector('.btn-text').textContent = 'Error — Try Again';
          submitBtn.disabled = false;
        }
      } else {
        // No endpoint configured — show success anyway (demo mode)
        // Remove this block once you add a real FORM_ENDPOINT above
        await sleep(1000);
        showSuccess();
      }
    });
  }

  function validateForm() {
    let valid = true;
    const fields = [
      { id: 'name',    msg: 'Please enter your name.' },
      { id: 'email',   msg: 'Please enter a valid email.', isEmail: true },
      { id: 'subject', msg: 'Please enter a subject.' },
      { id: 'message', msg: 'Please enter your message.' },
    ];
    fields.forEach(({ id, msg, isEmail }) => {
      const input = document.getElementById(id);
      const error = document.getElementById(id + 'Error');
      const val   = input.value.trim();
      const bad   = !val || (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
      input.classList.toggle('error', bad);
      if (error) error.textContent = bad ? msg : '';
      if (bad) valid = false;
    });
    return valid;
  }

  // Clear errors on input
  ['name','email','subject','message'].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('input', () => {
      el.classList.remove('error');
      const err = document.getElementById(id + 'Error');
      if (err) err.textContent = '';
    });
  });

  function showSuccess() {
    form.reset();
    successMsg.classList.add('visible');
    submitBtn.querySelector('.btn-text').textContent = 'Send Message';
    submitBtn.disabled = false;
    setTimeout(() => successMsg.classList.remove('visible'), 6000);
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  // ─── ACTIVE NAV LINK ON SCROLL ─────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        active?.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));

  // Highlight active nav link style
  const styleTag = document.createElement('style');
  styleTag.textContent = `.nav-links a.active { color: var(--text) !important; }
  .nav-links a.active::after { width: 100% !important; }`;
  document.head.appendChild(styleTag);

});
