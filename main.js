/* ═══════════════════════════════════════════════
   MAMADOU MANSOR SECK — Portfolio
   js/main.js
   Auteur : Mamadou Mansor Seck
   ISI Dakar — L3 Réseaux Informatiques
═══════════════════════════════════════════════ */

/* ════════════════════════════
   1. NAVIGATION
════════════════════════════ */
(function initNav() {
  const navbar    = document.getElementById('navbar');
  const links     = document.querySelectorAll('.nav-links a');
  const sections  = document.querySelectorAll('section[id]');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  links.forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }));
})();


/* ════════════════════════════
   2. SCROLL ANIMATIONS
════════════════════════════ */
(function initAOS() {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1 }
  );
  document.querySelectorAll('.aos').forEach(el => obs.observe(el));
})();


/* ════════════════════════════
   3. HERO COUNTERS
════════════════════════════ */
(function initHeroCounters() {
  const targets = [
    { id: 'hstat1', end: 6,  suffix: '+' },
    { id: 'hstat2', end: 20, suffix: '+' },
    { id: 'hstat3', end: 1,  suffix: ''  }
  ];
  let done = false;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !done) {
      done = true;
      targets.forEach(({ id, end, suffix }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const span = el.querySelector('span');
        const sfx  = span ? span.outerHTML : '';
        let n = 0;
        const step = Math.max(1, Math.ceil(end / 40));
        const t = setInterval(() => {
          n = Math.min(n + step, end);
          el.innerHTML = n + sfx;
          if (n >= end) clearInterval(t);
        }, 35);
      });
    }
  }, { threshold: 0.5 });
  const hero = document.getElementById('hero');
  if (hero) obs.observe(hero);
})();


/* ════════════════════════════
   4. ABOUT COUNTERS
════════════════════════════ */
(function initAboutCounters() {
  const counters = [
    { id: 'stat1', end: 6,  suffix: '' },
    { id: 'stat2', end: 20, suffix: '' },
    { id: 'stat3', end: 1,  suffix: '' }
  ];
  let done = false;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !done) {
      done = true;
      counters.forEach(({ id, end, suffix }) => {
        const el = document.getElementById(id);
        if (!el) return;
        let n = 0;
        const step = Math.max(1, Math.ceil(end / 50));
        const t = setInterval(() => {
          n = Math.min(n + step, end);
          el.textContent = n + suffix;
          if (n >= end) clearInterval(t);
        }, 28);
      });
    }
  }, { threshold: 0.4 });
  const row = document.querySelector('.stats-row');
  if (row) obs.observe(row);
})();


/* ════════════════════════════
   5. SECURITY BARS
════════════════════════════ */
(function initSecurityBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.security-bar-fill').forEach(bar => {
          const w = bar.getAttribute('data-width') || '0%';
          bar.style.width = '0%';
          setTimeout(() => { bar.style.width = w; }, 200);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.security-card').forEach(c => obs.observe(c));
})();


/* ════════════════════════════
   6. PROJECT MODALS
════════════════════════════ */
function openModal(id) {
  document.getElementById('modal-backdrop').classList.add('open');
  const m = document.getElementById(id);
  if (!m) return;
  m.style.display = 'block';
  requestAnimationFrame(() => requestAnimationFrame(() => m.classList.add('open')));
  document.body.style.overflow = 'hidden';
}

function closeAllModals() {
  document.getElementById('modal-backdrop').classList.remove('open');
  document.querySelectorAll('.modal').forEach(m => {
    m.classList.remove('open');
    setTimeout(() => { m.style.display = 'none'; }, 300);
  });
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllModals(); });


/* ════════════════════════════
   7. PROJECT FILTERS
════════════════════════════ */
(function initFilters() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-filter');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (f === 'all' || cat === f) {
          card.classList.remove('hidden');
          card.classList.remove('visible');
          requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('visible')));
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();


/* ════════════════════════════
   8. DOCS TABS
════════════════════════════ */
function showDoc(id, el) {
  document.querySelectorAll('.docs-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.docs-nav-item').forEach(i => i.classList.remove('active'));
  const panel = document.getElementById('doc-' + id);
  if (panel) panel.classList.add('active');
  if (el) el.classList.add('active');
}


/* ════════════════════════════
   9. CODE COPY
════════════════════════════ */
function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  if (!pre) return;
  const text = pre.innerText || pre.textContent;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => flash(btn));
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    flash(btn);
  }
}
function flash(btn) {
  const orig = btn.textContent;
  btn.textContent = '✓ Copié !';
  btn.style.color = '#22c55e';
  setTimeout(() => { btn.textContent = orig; btn.style.color = ''; }, 2000);
}


/* ════════════════════════════
   10. CONTACT FORM
════════════════════════════ */
function submitForm() {
  const fname   = document.getElementById('fname');
  const femail  = document.getElementById('femail');
  const fsubj   = document.getElementById('fsubject');
  const fmsg    = document.getElementById('fmessage');
  const alert   = document.getElementById('form-alert');
  const btn     = document.getElementById('form-btn');

  alert.className = 'form-alert';
  alert.textContent = '';

  if (!fname.value.trim())   return showAlert(alert, 'Le nom est requis.', false);
  if (!femail.value.trim())  return showAlert(alert, "L'email est requis.", false);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(femail.value)) return showAlert(alert, 'Email invalide.', false);
  if (!fsubj.value.trim())   return showAlert(alert, 'Le sujet est requis.', false);
  if (!fmsg.value.trim())    return showAlert(alert, 'Le message ne peut pas être vide.', false);

  btn.disabled = true;
  btn.innerHTML = '<span style="animation:spin 1s linear infinite;display:inline-block">⟳</span> Envoi en cours...';

  setTimeout(() => {
    showAlert(alert, '✓ Message envoyé ! Je vous répondrai sous 24h.', true);
    btn.disabled = false;
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg> Envoyer le message';
    fname.value = femail.value = fsubj.value = fmsg.value = '';
  }, 1500);
}

function showAlert(el, msg, success) {
  el.textContent = msg;
  el.className = 'form-alert ' + (success ? 'success' : 'error');
}


/* ════════════════════════════
   11. AWS CARDS STAGGER
════════════════════════════ */
(function initAWSStagger() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.aws-service-card').forEach((card, i) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity    = '1';
            card.style.transform  = 'translateY(0)';
          }, i * 75);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  const grid = document.querySelector('.aws-grid');
  if (grid) obs.observe(grid);
})();


/* ════════════════════════════
   12. TOPOLOGY SVG BLINKING
════════════════════════════ */
(function initBlink() {
  document.querySelectorAll('.topo-full-svg circle').forEach(dot => {
    if (dot.getAttribute('fill') === '#22c55e') {
      const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      anim.setAttribute('attributeName', 'opacity');
      anim.setAttribute('values', '1;0.35;1');
      anim.setAttribute('dur', '2.5s');
      anim.setAttribute('repeatCount', 'indefinite');
      dot.appendChild(anim);
    }
  });
})();


/* ════════════════════════════
   13. SKILL CHIP DELAY
════════════════════════════ */
(function initChipDelays() {
  document.querySelectorAll('.skill-chip').forEach((c, i) => {
    c.style.transitionDelay = (i % 8) * 0.03 + 's';
  });
})();


/* ════════════════════════════
   14. CLOUD FLOW TOOLTIPS
════════════════════════════ */
(function initFlowTooltips() {
  const tips = {
    'Proxmox / ESXi':  'Hyperviseur — hébergement VMs Debian, Ubuntu, Windows Server',
    'VM Debian/NGINX': 'Serveur web NGINX + Asterisk VoIP installés sous Debian 12',
    'VM Windows/AD':   'Windows Server 2022 — Active Directory + GPO déployés',
    'VM Asterisk':     'PBX Asterisk — extensions SIP 101/102/103 configurées',
    'pfSense FW':      'pfSense — portail captif + filtrage réseau + NAT',
    'Internet / WAN':  'Connexion WAN sortante après filtrage pfSense'
  };
  document.querySelectorAll('.cloud-flow-label').forEach(lbl => {
    const tip = tips[lbl.textContent.trim()];
    if (tip) { lbl.title = tip; lbl.style.cursor = 'help'; }
  });
})();
