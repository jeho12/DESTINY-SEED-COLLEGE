/**
 * Destiny Seeds Schools - Official Interactive Scripts
 * Ported Patterns from Crestfield & Mobile Responsiveness Engine:
 * - Live Theme Switcher (Navy / Emerald / Oxford)
 * - Mobile Slide-Over Drawer Navigation with Backdrop & Accordion
 * - Admissions Hub Tabs & FAQ Accordion
 * - Prospectus Download Modal
 * - Campus Life Gallery Filtering & Lightbox Viewer
 * - Sticky Header, Animated Number Counters & Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===================================================================
  // 1. LIVE THEME SWITCHER (Crestfield Pattern)
  // ===================================================================
  const themePresets = {
    navy: {
      '--color-primary': '#0b1f48',
      '--color-primary-dark': '#07132b',
      '--color-primary-light': '#163677',
      '--color-accent-gold': '#f59e0b',
      '--color-accent-gold-hover': '#d97706',
      '--color-accent-gold-light': '#fef3c7',
      '--color-accent-gold-subtle': 'rgba(245, 158, 11, 0.12)'
    },
    emerald: {
      '--color-primary': '#064e3b',
      '--color-primary-dark': '#022c22',
      '--color-primary-light': '#047857',
      '--color-accent-gold': '#10b981',
      '--color-accent-gold-hover': '#059669',
      '--color-accent-gold-light': '#d1fae5',
      '--color-accent-gold-subtle': 'rgba(16, 185, 129, 0.12)'
    },
    oxford: {
      '--color-primary': '#1e1b4b',
      '--color-primary-dark': '#0f172a',
      '--color-primary-light': '#312e81',
      '--color-accent-gold': '#e11d48',
      '--color-accent-gold-hover': '#be123c',
      '--color-accent-gold-light': '#ffe4e6',
      '--color-accent-gold-subtle': 'rgba(225, 29, 72, 0.12)'
    }
  };

  const themeChips = document.querySelectorAll('.theme-chip');
  themeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const selectedTheme = chip.getAttribute('data-theme');
      if (themePresets[selectedTheme]) {
        themeChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const root = document.documentElement;
        Object.entries(themePresets[selectedTheme]).forEach(([variable, value]) => {
          root.style.setProperty(variable, value);
        });

        showToast(`Theme switched to ${chip.textContent.trim()}!`, 'info');
      }
    });
  });

  // ===================================================================
  // 2. STICKY HEADER
  // ===================================================================
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('header-scrolled');
    } else {
      header?.classList.remove('header-scrolled');
    }
  });

  // ===================================================================
  // 3. MOBILE SLIDE-OVER DRAWER & BACKDROP
  // ===================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');
  const navDrawerClose = document.getElementById('navDrawerClose');

  const openDrawer = () => {
    navMenu?.classList.add('drawer-open');
    navBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeDrawer = () => {
    navMenu?.classList.remove('drawer-open');
    navBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (navDrawerClose) navDrawerClose.addEventListener('click', closeDrawer);
  if (navBackdrop) navBackdrop.addEventListener('click', closeDrawer);

  // Mobile Submenu Accordion
  const navDropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');
  navDropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = trigger.closest('.nav-dropdown');
        parent?.classList.toggle('open');
      }
    });
  });

  // Smooth Scroll for Nav Links & Auto-Close Drawer
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          closeDrawer();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ===================================================================
  // 4. ADMISSIONS HUB TABS & FAQ ACCORDION (Crestfield Pattern)
  // ===================================================================
  const admissionsTabBtns = document.querySelectorAll('.admissions-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  admissionsTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      admissionsTabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      btn.classList.add('active');
      const targetTabId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetTabId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // FAQ Accordion
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(headerBtn => {
    headerBtn.addEventListener('click', () => {
      const parentFaq = headerBtn.closest('.faq-item');
      const isAlreadyActive = parentFaq?.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
      if (!isAlreadyActive && parentFaq) {
        parentFaq.classList.add('active');
      }
    });
  });

  // ===================================================================
  // 5. PROSPECTUS DOWNLOAD MODAL
  // ===================================================================
  const prospectusModal = document.getElementById('prospectusModal');
  const openProspectusBtns = document.querySelectorAll('.trigger-prospectus-modal');
  const closeProspectusBtn = document.getElementById('closeProspectusBtn');
  const prospectusForm = document.getElementById('prospectusDownloadForm');

  openProspectusBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (prospectusModal) {
        prospectusModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeProspectus = () => {
    if (prospectusModal) {
      prospectusModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (closeProspectusBtn) closeProspectusBtn.addEventListener('click', closeProspectus);
  if (prospectusModal) {
    prospectusModal.addEventListener('click', (e) => {
      if (e.target === prospectusModal) closeProspectus();
    });
  }

  if (prospectusForm) {
    prospectusForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeProspectus();
      showToast('📥 Downloading Destiny Seeds Official Prospectus (PDF)... Check your downloads!', 'success');
      prospectusForm.reset();
    });
  }

  // ===================================================================
  // 6. CAMPUS LIFE GALLERY & LIGHTBOX VIEWER
  // ===================================================================
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInPane 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Modal
  const lightboxModal = document.getElementById('galleryLightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxSub = document.getElementById('lightboxSub');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('.gallery-card-title')?.textContent || 'Destiny Seeds Campus';
      const sub = card.querySelector('.gallery-card-sub')?.textContent || 'Excellence in Education';

      if (lightboxModal && lightboxImg) {
        lightboxImg.src = img?.src || '';
        lightboxImg.alt = title;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxSub) lightboxSub.textContent = sub;
        lightboxModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // ===================================================================
  // 7. NUMBER COUNTER ANIMATION
  // ===================================================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const runCounter = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const prefix = stat.getAttribute('data-prefix') || '';
      const suffix = stat.getAttribute('data-suffix') || '';
      let count = 0;
      const step = Math.ceil(target / 40);

      const updateCount = () => {
        count += step;
        if (count >= target) {
          stat.textContent = prefix + target.toLocaleString() + suffix;
        } else {
          stat.textContent = prefix + count.toLocaleString() + suffix;
          requestAnimationFrame(updateCount);
        }
      };
      updateCount();
    });
  };

  const observerOptions = { threshold: 0.3 };
  const statsSection = document.querySelector('.stats-strip');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          runCounter();
          animated = true;
        }
      });
    }, observerOptions);
    observer.observe(statsSection);
  }

  // ===================================================================
  // 8. NEWS FILTERING
  // ===================================================================
  const filterBtns = document.querySelectorAll('.news-filter-btn');
  const newsCards = document.querySelectorAll('.news-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      newsCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInPane 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ===================================================================
  // 9. FORMS (Admissions Quick Form & Contact Form)
  // ===================================================================
  const quickAdmissionsForm = document.getElementById('quickAdmissionsForm');
  if (quickAdmissionsForm) {
    quickAdmissionsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const parentName = document.getElementById('admitParentName')?.value || 'Parent';
      const studentWing = document.getElementById('admitWing')?.value || 'Destiny Seeds';

      showToast(`Thank you, ${parentName}! Inquiry for ${studentWing} received. Our admissions desk will call you shortly.`, 'success');
      quickAdmissionsForm.reset();
    });
  }

  const contactForm = document.getElementById('mainContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || 'Visitor';
      showToast(`Thank you, ${name}! Your inquiry has been routed to the Destiny Seeds administration desk.`, 'success');
      contactForm.reset();
    });
  }

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for subscribing to the Destiny Seeds Digest!', 'success');
      newsletterForm.reset();
    });
  }

  // ===================================================================
  // 10. MANAGEMENT PITCH NOTES MODAL & FAB
  // ===================================================================
  const modalBackdrop = document.getElementById('presentationModal');
  const openModalBtns = document.querySelectorAll('.trigger-presentation-modal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const fabContainer = document.querySelector('.presentation-fab-container');
  const fabCloseBtn = document.querySelector('.presentation-fab-close');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modalBackdrop) {
        modalBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closePitchModal = () => {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closePitchModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closePitchModal();
    });
  }

  if (fabCloseBtn && fabContainer) {
    fabCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fabContainer.classList.add('hidden-fab');
    });
  }

  // Keyboard accessibility (ESC to close any open modal)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePitchModal();
      closeProspectus();
      closeLightbox();
      closeDrawer();
    }
  });

  // ===================================================================
  // 11. TOAST NOTIFICATION SYSTEM
  // ===================================================================
  function showToast(message, type = 'success') {
    let toast = document.querySelector('.site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'site-toast';
      document.body.appendChild(toast);

      toast.style.position = 'fixed';
      toast.style.bottom = '24px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      toast.style.background = '#07132b';
      toast.style.color = '#ffffff';
      toast.style.padding = '0.9rem 1.6rem';
      toast.style.borderRadius = '50px';
      toast.style.boxShadow = '0 15px 35px rgba(0,0,0,0.35)';
      toast.style.border = '2px solid #f59e0b';
      toast.style.zIndex = '3000';
      toast.style.fontSize = '0.9rem';
      toast.style.fontWeight = '600';
      toast.style.transition = 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
      toast.style.display = 'flex';
      toast.style.alignItems = 'center';
      toast.style.gap = '0.75rem';
      toast.style.maxWidth = '92%';
      toast.style.textAlign = 'center';
      toast.style.lineHeight = '1.4';
    }

    const iconHtml = type === 'info' 
      ? '<i class="fas fa-palette" style="color: #60a5fa; font-size: 1.15rem;"></i>'
      : '<i class="fas fa-check-circle" style="color: #10b981; font-size: 1.15rem;"></i>';

    toast.innerHTML = `${iconHtml} <span>${message}</span>`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 4200);
  }
});
