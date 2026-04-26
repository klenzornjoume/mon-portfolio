/*═══════════════════════════════════════════
     JAVASCRIPT
══════════════════════════════════════════════ */
  // ── Year ──
  document.getElementById('year').textContent = new Date().getFullYear();

  // ── Navbar scroll ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── Progress bar ──
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });

  // ── Active nav link ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  // ── Mobile menu ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu  = document.getElementById('closeMenu');
  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenuFn() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click', openMenu);
  hamburger.addEventListener('keydown', e => e.key === 'Enter' && openMenu());
  closeMenu.addEventListener('click', closeMenuFn);
  document.querySelectorAll('.mob-link').forEach(a => {
    a.addEventListener('click', closeMenuFn);
  });

  // ── Back to top ──
  const backTop = document.getElementById('back-top');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  backTop.addEventListener('keydown', e => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── Skill bars (Intersection Observer) ──
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

  // ── Timeline items animation ──
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 120);
        tlObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.timeline-item').forEach(el => tlObserver.observe(el));

  // ── Counter animation ──
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = Math.ceil(target / 30);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 50);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

  // ── Photo upload ──
  const photoPlaceholder = document.getElementById('photo-placeholder');
  const photoInput       = document.getElementById('photo-input');
  if (photoPlaceholder && photoInput) {
    photoPlaceholder.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const frame = photoPlaceholder.parentElement;
        photoPlaceholder.remove();
        const img = document.createElement('img');
        img.className = 'photo-img';
        img.src = ev.target.result;
        img.alt = 'Photo de profil';
        frame.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }

  // ── Form submit ──
  function handleFormSubmit() {
    const name    = document.getElementById('c-name').value.trim();
    const email   = document.getElementById('c-email').value.trim();
    const subject = document.getElementById('c-subject').value.trim();
    const message = document.getElementById('c-message').value.trim();
    const msg     = document.getElementById('form-msg');

    if (!name || !email || !message) {
      msg.style.display = 'block';
      msg.style.color = '#e27e7e';
      msg.textContent = '⚠️ Veuillez remplir tous les champs obligatoires.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.style.display = 'block';
      msg.style.color = '#e27e7e';
      msg.textContent = '⚠️ Adresse email invalide.';
      return;
    }
    // Ici, intégrez votre service d'envoi (EmailJS, Formspree, etc.)
    msg.style.display = 'block';
    msg.style.color = 'var(--gold-light)';
    msg.textContent = '✓ Message envoyé ! Je vous répondrai dès que possible.';
    document.getElementById('c-name').value = '';
    document.getElementById('c-email').value = '';
    document.getElementById('c-subject').value = '';
    document.getElementById('c-message').value = '';
  }

  // ── Smooth scroll for all anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });