/* ═══════════════════════════════════════
   ADITYA DORWAL — PORTFOLIO SCRIPT v2
═══════════════════════════════════════ */

// ── FORM ENDPOINT ──────────────────────────────────────────────────────────
// Paste your Formspree URL here to make the contact form actually send emails.
// Steps: formspree.io → sign up free → new form → copy endpoint
const FORM_ENDPOINT = 'https://formspree.io/f/mqeypebn'; // e.g. 'https://formspree.io/f/xabcdefg'

document.addEventListener('DOMContentLoaded', () => {

  // ── CUSTOM CURSOR ─────────────────────────────────────────────────────
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mx = -100, my = -100, fx = -100, fy = -100;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animCursor() {
    if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
    if (follower) {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px'; follower.style.top = fy + 'px';
    }
    requestAnimationFrame(animCursor);
  }
  animCursor();

  // Scale follower on interactive elements
  document.querySelectorAll('a, button, .pcard, .clink, .flt, .stag').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor)   cursor.style.transform = 'translate(-50%,-50%) scale(0)';
      if (follower) { follower.style.transform = 'translate(-50%,-50%) scale(1.8)'; follower.style.borderColor = 'var(--amber)'; }
    });
    el.addEventListener('mouseleave', () => {
      if (cursor)   cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      if (follower) { follower.style.transform = 'translate(-50%,-50%) scale(1)'; follower.style.borderColor = 'rgba(255,183,77,0.4)'; }
    });
  });

  // ── TYPEWRITER ────────────────────────────────────────────────────────
  const roles = [
    'AI/ML Engineer',
    'NLP Developer',
    'Deep Learning Practitioner',
    'Python Developer',
    'Applied AI Builder',
  ];
  const tw = document.getElementById('typewriter');
  if (tw) {
    let ri = 0, ci = 0, deleting = false;
    function type() {
      const word = roles[ri];
      if (!deleting) {
        tw.textContent = word.substring(0, ci + 1);
        ci++;
        if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
        setTimeout(type, 80);
      } else {
        tw.textContent = word.substring(0, ci - 1);
        ci--;
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 300); return; }
        setTimeout(type, 40);
      }
    }
    setTimeout(type, 1000);
  }

  // ── STICKY HEADER ─────────────────────────────────────────────────────
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', y > 500);
  }, { passive: true });

  scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── MOBILE HAMBURGER ──────────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const navOverlay = document.createElement('div');
  navOverlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:997;display:none;';
  document.body.appendChild(navOverlay);

  function toggleMenu(open) {
    navLinks?.classList.toggle('open', open);
    hamburger?.classList.toggle('open', open);
    navOverlay.style.display = open ? 'block' : 'none';
    document.body.style.overflow = open ? 'hidden' : '';
  }
  hamburger?.addEventListener('click', () => toggleMenu(!navLinks.classList.contains('open')));
  navOverlay.addEventListener('click', () => toggleMenu(false));
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  // ── SMOOTH SCROLL ─────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    });
  });

  // ── REVEAL ON SCROLL ──────────────────────────────────────────────────
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = entry.target.parentElement?.querySelectorAll('.reveal,.reveal-left,.reveal-right');
      let delay = 0;
      if (siblings) {
        const arr = Array.from(siblings);
        const idx = arr.indexOf(entry.target);
        delay = idx * 60;
      }
      setTimeout(() => entry.target.classList.add('in-view'), delay);
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => revealObs.observe(el));

  // ── SKILL BARS ────────────────────────────────────────────────────────
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.prof-fill').forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, i * 100);
      });
      barObs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.proficiency-section').forEach(el => barObs.observe(el));

  // ── PROJECT FILTER ────────────────────────────────────────────────────
  document.querySelectorAll('.flt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.flt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.pcard').forEach(card => {
        const match = f === 'all' || card.dataset.cat === f;
        if (match) {
          card.classList.remove('hidden');
          card.style.opacity = '1';
          card.style.transform = '';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.94)';
          setTimeout(() => card.classList.add('hidden'), 280);
        }
      });
    });
  });

  // ── ACTIVE NAV HIGHLIGHT ──────────────────────────────────────────────
  const sectionEls = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');

  const navObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => a.classList.remove('active'));
        document.querySelector(`.nav-links a[href="#${e.target.id}"]`)?.classList.add('active');
      }
    });
  }, { threshold: 0.35 });
  sectionEls.forEach(s => navObs.observe(s));

  // ── CONTACT FORM ──────────────────────────────────────────────────────
  const form    = document.getElementById('contactForm');
  const btnText = document.getElementById('btnText');
  const success = document.getElementById('formSuccess');

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateForm()) return;

    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    if (btnText) btnText.textContent = 'Sending…';

    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (!res.ok) throw new Error();
      } else {
        await new Promise(r => setTimeout(r, 900)); // demo delay
      }
      form.reset();
      success?.classList.add('visible');
      setTimeout(() => success?.classList.remove('visible'), 6000);
    } catch {
      if (btnText) btnText.textContent = 'Error — try again';
    } finally {
      btn.disabled = false;
      if (btnText && btnText.textContent !== 'Error — try again') {
        btnText.textContent = 'Send Message';
      }
    }
  });

  function validateForm() {
    const fields = [
      { id: 'name',    err: 'nameErr',    msg: 'Name is required.' },
      { id: 'email',   err: 'emailErr',   msg: 'Valid email required.', email: true },
      { id: 'subject', err: 'subjectErr', msg: 'Subject is required.' },
      { id: 'message', err: 'messageErr', msg: 'Message is required.' },
    ];
    let ok = true;
    fields.forEach(f => {
      const el = document.getElementById(f.id);
      const er = document.getElementById(f.err);
      const v  = el?.value.trim();
      const bad = !v || (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
      el?.classList.toggle('error', bad);
      if (er) er.textContent = bad ? f.msg : '';
      if (bad) ok = false;
    });
    return ok;
  }

  ['name','email','subject','message'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', function() {
      this.classList.remove('error');
      const er = document.getElementById(id + 'Err');
      if (er) er.textContent = '';
    });
  });

  // ── NUMBERS COUNT-UP ──────────────────────────────────────────────────
  const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.stat-num').forEach(el => {
        const text  = el.textContent.replace('+','').trim();
        const target = parseFloat(text);
        if (isNaN(target)) return;
        const isDecimal = text.includes('.');
        const hasPlusEl = el.querySelector('.plus');
        const suffix = hasPlusEl ? hasPlusEl.outerHTML : '';
        const duration = 1400;
        const startTime = performance.now();
        function update(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const val = target * ease;
          el.innerHTML = (isDecimal ? val.toFixed(1) : Math.floor(val)) + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
      });
      statObs.unobserve(e.target);
    });
  }, { threshold: 0.7 });

  document.querySelectorAll('.hero-stats').forEach(el => statObs.observe(el));

});
