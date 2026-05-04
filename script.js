// VECTORIUM ENGINEERING — SCRIPT.JS

// ── PRELOADER ─────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const pre = document.getElementById('preloader');
    if (pre) pre.classList.add('hide');
  }, 1800);
});

// ── NAV SCROLL ────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── MOBILE MENU ───────────────────────────────
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', (e) => {
  e.stopPropagation();
  mobileMenu.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) mobileMenu.classList.remove('open');
});
function closeMob() { mobileMenu.classList.remove('open'); }

// ── SCROLL REVEAL ─────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── SMOOTH SCROLL ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── PARTICLE CANVAS ───────────────────────────
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function rand(min, max) { return Math.random() * (max - min) + min; }

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: rand(0, 1), y: rand(0, 1),
      vx: rand(-0.05, 0.05), vy: rand(-0.05, 0.05),
      r: rand(1, 2.5), a: rand(0.1, 0.4)
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx / W * 0.5;
      p.y += p.vy / H * 0.5;
      if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ── CONTACT FORM ──────────────────────────────
function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('fBtn');
  const success = document.getElementById('fSuccess');
  const form = document.getElementById('cForm');

  const inputs = form.querySelectorAll('input, select, textarea');
  const name = inputs[0].value;
  const email = inputs[1].value;
  const service = inputs[2].value;
  const message = inputs[3].value;

  btn.disabled = true;
  btn.textContent = 'Sending...';

  const subject = encodeURIComponent(`Vectorium Engineering — Project Brief from ${name}`);
  const body = encodeURIComponent(
    `Name/Company: ${name}\nEmail: ${email}\nService: ${service || 'Not specified'}\n\nProject Brief:\n${message}`
  );

  setTimeout(() => {
    window.location.href = `mailto:contact@vectoriumengineering.com?subject=${subject}&body=${body}`;
    btn.disabled = false;
    btn.textContent = 'Send Brief →';
    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 6000);
  }, 600);
}

// ── TICKER PAUSE ──────────────────────────────
const ticker = document.getElementById('ticker');
if (ticker) {
  ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
  ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
}

// ── ACTIVE NAV HIGHLIGHT ──────────────────────
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAs.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) a.style.color = 'var(--cyan)';
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => sectionObs.observe(s));
