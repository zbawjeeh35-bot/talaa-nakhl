/* ============================================
   TALAA NAKHL - JAVASCRIPT
   طلع النخل - التفاعلية والحركات
   ============================================ */

/* ============================================
   DASHBOARD DATA SYNC - تطبيق بيانات لوحة التحكم
   ============================================ */
(function applyDashboardData() {
  try {
    const saved = localStorage.getItem('talaa_nakhl_data');
    if (!saved) return;
    const data = JSON.parse(saved);

    /* --- Settings --- */
    if (data.settings) {
      const s = data.settings;
      if (s.pageTitle) document.title = s.pageTitle;
      const logoMain = document.querySelector('.logo-main');
      if (logoMain && s.storeName) logoMain.textContent = s.storeName;
      const logoSub = document.querySelector('.logo-sub');
      if (logoSub && s.tagline) logoSub.textContent = s.tagline;
      const navCta = document.querySelector('.nav-cta');
      if (navCta && s.navCta) navCta.textContent = s.navCta;
      if (s.marquee) {
        const track = document.querySelector('.marquee-track');
        if (track) {
          const items = s.marquee.split('|').filter(Boolean);
          track.innerHTML = [...items, ...items].map(i => `<span>${i}</span>`).join('');
        }
      }
    }

    /* --- Hero --- */
    if (data.hero) {
      const h = data.hero;
      const titleLine1 = document.querySelector('.title-line-1');
      const titleLine2 = document.querySelector('.title-line-2');
      const heroDesc = document.querySelector('.hero-desc');
      const stats = document.querySelectorAll('.stat-num');
      const btn1 = document.querySelector('.btn-primary');
      const btn2 = document.querySelector('.btn-secondary');
      if (titleLine1 && h.mainTitle) titleLine1.textContent = h.mainTitle;
      if (titleLine2 && h.subtitle) titleLine2.textContent = h.subtitle;
      if (heroDesc && h.desc) heroDesc.textContent = h.desc;
      if (stats[0] && h.stat1) stats[0].textContent = h.stat1;
      if (stats[1] && h.stat2) stats[1].textContent = h.stat2;
      if (stats[2] && h.stat3) stats[2].textContent = h.stat3;
      if (btn1 && h.btn1) btn1.textContent = h.btn1;
      if (btn2 && h.btn2) btn2.textContent = h.btn2;
    }

    /* --- About --- */
    if (data.about) {
      const a = data.about;
      const aboutTitle = document.querySelector('#about .section-title');
      const aboutTag = document.querySelector('#about .section-tag');
      const aboutDesc = document.querySelector('#about .about-text p');
      if (aboutTitle && a.title) aboutTitle.textContent = a.title;
      if (aboutTag && a.tag) aboutTag.textContent = a.tag;
      if (aboutDesc && a.desc) aboutDesc.textContent = a.desc;
    }

    /* --- Products --- */
    if (data.products) {
      ['dates','honey','gifts'].forEach(cat => {
        const cards = document.querySelectorAll(`#tab-${cat} .product-card`);
        const items = data.products[cat] || [];
        cards.forEach((card, i) => {
          if (!items[i]) return;
          const nameEl = card.querySelector('h3');
          const priceEl = card.querySelector('.product-price strong');
          const descEl = card.querySelector('.product-info p');
          const badgeEl = card.querySelector('.product-badge');
          if (nameEl) nameEl.textContent = items[i].name;
          if (priceEl) priceEl.textContent = items[i].price;
          if (descEl) descEl.textContent = items[i].desc;
          if (badgeEl) {
            if (items[i].badge) { badgeEl.textContent = items[i].badge; badgeEl.style.display = ''; }
            else badgeEl.style.display = 'none';
          }
        });
      });
    }

    /* --- Testimonials --- */
    if (data.testimonials && data.testimonials.length > 0) {
      const grid = document.querySelector('.testimonials-grid');
      if (grid) {
        grid.innerHTML = '';
        data.testimonials.forEach((t, i) => {
          const stars = '★'.repeat(t.stars || 5);
          const isFeatured = i === 1 ? ' featured' : '';
          grid.innerHTML += `
            <div class="testimonial-card${isFeatured}">
              <div class="stars">${stars}</div>
              <p>"${t.text}"</p>
              <div class="testimonial-author">
                <div class="author-avatar">${t.name.charAt(0)}</div>
                <div><strong>${t.name}</strong><span>${t.city}</span></div>
              </div>
            </div>`;
        });
      }
    }

    /* --- Contact --- */
    if (data.contact) {
      const c = data.contact;
      const wa = c.whatsapp || '966509939591';
      document.querySelectorAll('a[href*="wa.me"]').forEach(el => { el.href = `https://wa.me/${wa}`; });
      if (c.maps) {
        document.querySelectorAll('a[href*="google"]').forEach(el => {
          if (el.href.includes('share.google') || el.href.includes('maps.google')) el.href = c.maps;
        });
      }
    }

    /* --- Banner Offer --- */
    if (data.banner && data.banner.active) {
      const b = data.banner;
      const banner = document.createElement('div');
      banner.id = 'offer-banner-dynamic';
      banner.style.cssText = 'background:linear-gradient(135deg,#c9a84c,#a07830);color:#3a2010;text-align:center;padding:12px 20px;font-family:Tajawal,sans-serif;font-weight:700;font-size:1rem;position:relative;z-index:200;';
      banner.innerHTML = `<span style="font-size:1.3rem;font-weight:900;margin-left:10px;">${b.discount}</span><span>${b.title} — ${b.desc}</span><a href="#order" style="margin-right:14px;background:#3a2010;color:#e8c96a;padding:5px 14px;border-radius:20px;text-decoration:none;font-size:0.88rem;">${b.btn}</a>`;
      const navbar = document.getElementById('navbar');
      if (navbar) navbar.parentNode.insertBefore(banner, navbar);
      else document.body.prepend(banner);
    }

  } catch(e) { console.warn('Dashboard sync error:', e); }
})();

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
