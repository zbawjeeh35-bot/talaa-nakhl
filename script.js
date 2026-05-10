/* ============================================
   TALAA NAKHL - JAVASCRIPT
   طلع النخل - التفاعلية والحركات
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('visible');
    }
  });

  /* ---- BACK TO TOP ---- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  /* ---- PRODUCTS TABS ---- */
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(`tab-${target}`);
      if (targetContent) {
        targetContent.classList.add('active');
        // Animate cards
        targetContent.querySelectorAll('.product-card').forEach((card, i) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 80);
        });
      }
    });
  });

  /* ---- HERO PARTICLES ---- */
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 8 + 3;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.1};
        animation-duration: ${Math.random() * 4 + 3}s;
        animation-delay: ${Math.random() * 3}s;
      `;
      particlesContainer.appendChild(p);
    }
  }

  /* ---- INTERSECTION OBSERVER (Scroll Animations) ---- */
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Animate on scroll
  const animateEls = document.querySelectorAll(
    '.feature-card, .product-card, .testimonial-card, .contact-card, .value-item'
  );

  animateEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.5s ease ${i * 0.06}s`;
    observer.observe(el);
  });

  /* ---- COUNTER ANIMATION ---- */
  const counters = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const num = parseInt(text.replace(/[^0-9]/g, ''));

        if (isNaN(num)) return;

        let current = 0;
        const step = num / 60;
        const timer = setInterval(() => {
          current += step;
          if (current >= num) {
            current = num;
            clearInterval(timer);
          }
          el.textContent = (hasPlus ? '+' : '') + Math.floor(current) + (hasPercent ? '%' : '');
        }, 25);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ---- SMOOTH SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- ORDER FORM ---- */
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = orderForm.querySelector('input[type="text"]').value;
      const phone   = orderForm.querySelector('input[type="tel"]').value;
      const city    = orderForm.querySelectorAll('input[type="text"]')[1]?.value || '';
      const product = orderForm.querySelector('select').value;
      const notes   = orderForm.querySelector('textarea').value;

      const msg = encodeURIComponent(
        `🌴 *طلب جديد من طلع النخل*\n\n` +
        `👤 الاسم: ${name}\n` +
        `📱 الجوال: ${phone}\n` +
        `🏙️ المدينة: ${city}\n` +
        `🛒 المنتج: ${product}\n` +
        (notes ? `📝 ملاحظات: ${notes}` : '')
      );

      window.open(`https://wa.me/966509939591?text=${msg}`, '_blank');
    });
  }

  /* ---- NEWSLETTER FORM ---- */
  const newsletterBtn = document.querySelector('.newsletter-form button');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', () => {
      const input = document.querySelector('.newsletter-form input');
      if (input && input.value) {
        newsletterBtn.textContent = '✓ تم الاشتراك!';
        newsletterBtn.style.background = 'linear-gradient(135deg, #4A7A28, #2D5016)';
        newsletterBtn.style.color = '#fff';
        input.value = '';
        setTimeout(() => {
          newsletterBtn.textContent = 'اشترك';
          newsletterBtn.style.background = '';
          newsletterBtn.style.color = '';
        }, 3000);
      }
    });
  }

  /* ---- ACTIVE NAV LINK ON SCROLL ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinkEls.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active-link');
      }
    });
  });

});
