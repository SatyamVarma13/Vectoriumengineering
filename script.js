// VECTORIUM ENGINEERING — script.js

// ── PRELOADER ────────────────────────────────────
const preloader = document.getElementById('preloader');
const preFill   = document.getElementById('preFill');
const preTxt    = document.getElementById('preTxt');
let pct = 0;
const iv = setInterval(() => {
  pct += Math.random() * 14 + 4;
  if (pct >= 100) {
    pct = 100;
    clearInterval(iv);
    setTimeout(() => preloader.classList.add('out'), 350);
  }
  preFill.style.width = pct + '%';
  if (preTxt) preTxt.textContent = Math.floor(pct) + '%';
}, 80);

// ── HEADER SCROLL ────────────────────────────────
const header = document.getElementById('header');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
  if (backTop) backTop.classList.toggle('show', window.scrollY > 400);
}, { passive: true });

// ── BACK TO TOP ──────────────────────────────────
if (backTop) {
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'auto' }));
}

// ── MOBILE NAV ───────────────────────────────────
const burger = document.getElementById('burger');
const mobNav = document.getElementById('mobNav');
burger.addEventListener('click', e => {
  e.stopPropagation();
  header.classList.toggle('open');
  mobNav.classList.toggle('show');
});
document.addEventListener('click', e => {
  if (!header.contains(e.target)) {
    header.classList.remove('open');
    mobNav.classList.remove('show');
  }
});
function closeMob() {
  header.classList.remove('open');
  mobNav.classList.remove('show');
}

// ── SMOOTH SCROLL ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'auto' });
  });
});

// ── SCROLL REVEAL ────────────────────────────────
const revObs = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('visible');
      revObs.unobserve(en.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

// ── HERO CANVAS ──────────────────────────────────
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];
  const resize = () => {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  for (let i = 0; i < 55; i++) {
    pts.push({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() - 0.5) * 0.14,
      r: Math.random() * 1.6 + 0.5,
      a: Math.random() * 0.3 + 0.06
    });
  }

  (function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx / W; p.y += p.vy / H;
      if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(47,141,255,${p.a})`;
      ctx.fill();
    });
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = (pts[i].x - pts[j].x) * W;
        const dy = (pts[i].y - pts[j].y) * H;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x * W, pts[i].y * H);
          ctx.lineTo(pts[j].x * W, pts[j].y * H);
          ctx.strokeStyle = `rgba(47,141,255,${0.07 * (1 - d / 110)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  })();
}

// ── ACTIVE NAV ───────────────────────────────────
const secs = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('nav a');
secs.forEach(sec => {
  new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        navAs.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + en.target.id) a.style.color = 'var(--accent)';
        });
      }
    });
  }, { threshold: 0.35 }).observe(sec);
});

// ── CONTACT FORM ─────────────────────────────────
function sendForm(e) {
  e.preventDefault();
  const btn  = document.getElementById('fBtn');
  const ok   = document.getElementById('fOk');
  const form = document.getElementById('cForm');
  const ins  = form.querySelectorAll('input, select, textarea');
  const name    = ins[0].value;
  const email   = ins[1].value;
  const phone   = ins[2].value;
  const service = ins[3].value;
  const message = ins[4].value;

  btn.disabled = true;
  btn.textContent = 'Sending...';

  const sub  = encodeURIComponent(`Vectorium Engineering — Enquiry from ${name}`);
  const body = encodeURIComponent(
    `Name/Company: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service || 'Not specified'}\n\nProject Brief:\n${message}`
  );

  setTimeout(() => {
    window.location.href = `mailto:contact@vectoriumengineering.com?subject=${sub}&body=${body}`;
    btn.disabled = false;
    btn.textContent = 'Send Enquiry →';
    ok.classList.add('show');
    form.reset();
    setTimeout(() => ok.classList.remove('show'), 6000);
  }, 700);
}

// ── TICKER PAUSE ─────────────────────────────────
const ticker = document.querySelector('.ticker-track');
if (ticker) {
  ticker.parentElement.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
  ticker.parentElement.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
}
