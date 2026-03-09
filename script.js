/* ==========================================
   ADITYA DORWAL — Portfolio Script
   ========================================== */

// Paste Formspree URL here to actually send emails:
// Step: formspree.io → sign up → new form → copy endpoint
const FORM_ENDPOINT = '';

document.addEventListener('DOMContentLoaded', () => {

  /* ── STICKY HEADER ───────────────────────── */
  const header   = document.getElementById('header');
  const totop    = document.getElementById('totop');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('pinned', y > 40);
    totop.classList.toggle('show', y > 400);
  }, { passive: true });

  totop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── MOBILE MENU ─────────────────────────── */
  const burger   = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  // backdrop
  const bd = document.createElement('div');
  bd.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:989;display:none;';
  document.body.appendChild(bd);

  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    bd.style.display = open ? 'block' : 'none';
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  bd.addEventListener('click', () => setMenu(false));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* ── SMOOTH SCROLL ───────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.offsetTop - 66, behavior: 'smooth' });
    });
  });

  /* ── REVEAL ON SCROLL ────────────────────── */
  const revObs = new IntersectionObserver(entries => {
    entries.forEach((entry, _) => {
      if (!entry.isIntersecting) return;
      // stagger siblings
      const parent = entry.target.parentElement;
      const revEls = parent ? [...parent.querySelectorAll('.reveal,.reveal-l,.reveal-r')] : [];
      const idx = revEls.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('on'), idx * 80);
      revObs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-l, .reveal-r')
          .forEach(el => revObs.observe(el));

  /* ── SKILL BARS ──────────────────────────── */
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.sbar-fill').forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, i * 90);
      });
      barObs.unobserve(e.target);
    });
  }, { threshold: 0.25 });

  document.querySelectorAll('.skill-col').forEach(el => barObs.observe(el));

  /* ── PROJECT FILTER ──────────────────────── */
  const fBtns = document.querySelectorAll('.f-btn');
  const cards = document.querySelectorAll('.pj');

  fBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.f;
      cards.forEach(card => {
        const match = f === 'all' || card.dataset.c === f;
        card.style.transition = 'opacity 0.25s, transform 0.25s';
        if (match) {
          card.classList.remove('hidden');
          requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = ''; });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => card.classList.add('hidden'), 260);
        }
      });
    });
  });

  /* ── ACTIVE NAV ──────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('#navLinks a');

  const navObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => a.classList.remove('active'));
        const a = document.querySelector(`#navLinks a[href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObs.observe(s));

  /* ── CONTACT FORM ────────────────────────── */
  const form  = document.getElementById('cForm');
  const btn   = document.getElementById('cBtn');
  const btnTx = document.getElementById('cBtnTxt');
  const ok    = document.getElementById('fOk');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validate()) return;

      btn.disabled = true;
      btnTx.textContent = 'Sending…';

      try {
        if (FORM_ENDPOINT) {
          const res = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
          });
          if (!res.ok) throw new Error('server');
        } else {
          await delay(900); // demo mode — remove once FORM_ENDPOINT is set
        }
        form.reset();
        ok.classList.add('show');
        setTimeout(() => ok.classList.remove('show'), 6000);
      } catch {
        btnTx.textContent = 'Error — try again';
      } finally {
        btn.disabled = false;
        if (btnTx.textContent !== 'Error — try again') btnTx.textContent = 'Send Message';
      }
    });
  }

  function validate() {
    const fields = [
      { el: 'fname',  err: 'feN', msg: 'Please enter your name.' },
      { el: 'femail', err: 'feE', msg: 'Please enter a valid email.', email: true },
      { el: 'fsub',   err: 'feS', msg: 'Please enter a subject.' },
      { el: 'fmsg',   err: 'feM', msg: 'Please enter a message.' },
    ];
    let valid = true;
    fields.forEach(f => {
      const el  = document.getElementById(f.el);
      const err = document.getElementById(f.err);
      if (!el) return;
      const val = el.value.trim();
      const bad = !val || (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
      el.classList.toggle('err', bad);
      if (err) err.textContent = bad ? f.msg : '';
      if (bad) valid = false;
    });
    return valid;
  }

  // Clear error on typing
  ['fname','femail','fsub','fmsg'].forEach((id, i) => {
    const errIds = ['feN','feE','feS','feM'];
    document.getElementById(id)?.addEventListener('input', function() {
      this.classList.remove('err');
      const e = document.getElementById(errIds[i]);
      if (e) e.textContent = '';
    });
  });

  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

});
