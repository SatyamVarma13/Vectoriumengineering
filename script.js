// VECTORIUM ENGINEERING — SCRIPT.JS

// ── PRELOADER ─────────────────────────────────────
const preloader = document.getElementById('preloader');
const preFill = document.getElementById('preFill');
const prePct = document.getElementById('prePct');
let pct = 0;
const fillInterval = setInterval(() => {
  pct += Math.random() * 12 + 4;
  if (pct >= 100) {
    pct = 100;
    clearInterval(fillInterval);
    setTimeout(() => preloader.classList.add('out'), 300);
  }
  preFill.style.width = pct + '%';
  if (prePct) prePct.textContent = Math.floor(pct) + '%';
}, 80);

// ── CUSTOM CURSOR ─────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
});

function animFollower() {
  fx += (mx - fx) * 0.14;
  fy += (my - fy) * 0.14;
  if (follower) { follower.style.left = fx + 'px'; follower.style.top = fy + 'px'; }
  requestAnimationFrame(animFollower);
}
animFollower();

document.querySelectorAll('a, button, .cap-card, .ind-card, .proj-card, .pkg-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) { cursor.style.width = '16px'; cursor.style.height = '16px'; }
    if (follower) { follower.style.width = '46px'; follower.style.height = '46px'; }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) { cursor.style.width = '8px'; cursor.style.height = '8px'; }
    if (follower) { follower.style.width = '28px'; follower.style.height = '28px'; }
  });
});

// ── HEADER SCROLL ─────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── MOBILE NAV ────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', e => {
  e.stopPropagation();
  header.classList.toggle('open');
  mobileMenu.classList.toggle('show');
});
document.addEventListener('click', e => {
  if (!header.contains(e.target)) {
    header.classList.remove('open');
    mobileMenu.classList.remove('show');
  }
});
function closeMob() {
  header.classList.remove('open');
  mobileMenu.classList.remove('show');
}

// ── SMOOTH SCROLL ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── SCROLL REVEAL ─────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal-up').forEach(el => revealObs.observe(el));

// ── HERO CANVAS PARTICLES ─────────────────────────
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H;
  const particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.8 + 0.5,
      a: Math.random() * 0.35 + 0.05
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx / W;
      p.y += p.vy / H;
      if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(47,141,255,${p.a})`;
      ctx.fill();
    });

    // draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = (particles[i].x - particles[j].x) * W;
        const dy = (particles[i].y - particles[j].y) * H;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x * W, particles[i].y * H);
          ctx.lineTo(particles[j].x * W, particles[j].y * H);
          ctx.strokeStyle = `rgba(47,141,255,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

// ── ACTIVE NAV HIGHLIGHT ──────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');
new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + e.target.id) a.style.color = 'var(--accent)';
      });
    }
  });
}, { threshold: 0.35 }).observe && sections.forEach(s => {
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + e.target.id) a.style.color = 'var(--accent)';
        });
      }
    });
  }, { threshold: 0.35 }).observe(s);
});

// ── CONTACT FORM ──────────────────────────────────
function sendForm(e) {
  e.preventDefault();
  const btn = document.getElementById('fBtn');
  const ok = document.getElementById('fOk');
  const form = document.getElementById('cForm');
  const inputs = form.querySelectorAll('input, select, textarea');
  const name = inputs[0].value;
  const email = inputs[1].value;
  const service = inputs[2].value;
  const message = inputs[3].value;

  btn.disabled = true;
  btn.textContent = 'Sending...';

  const sub = encodeURIComponent(`Vectorium Engineering — Project Brief from ${name}`);
  const body = encodeURIComponent(`Name/Company: ${name}\nEmail: ${email}\nService: ${service || 'Not specified'}\n\nProject Brief:\n${message}`);

  setTimeout(() => {
    window.location.href = `mailto:contact@vectoriumengineering.com?subject=${sub}&body=${body}`;
    btn.disabled = false;
    btn.textContent = 'Send Brief →';
    ok.classList.add('show');
    form.reset();
    setTimeout(() => ok.classList.remove('show'), 6000);
  }, 700);
}

// ── NUMBER COUNTER ANIMATION ──────────────────────
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const val = Math.floor(progress * target);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

// Trigger counters when stats section is visible
const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      statsObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.hs-item').forEach(el => statsObs.observe(el));
