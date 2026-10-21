/**
 * Destiny Seeds Schools - Official Interactive Scripts
 * Handles animations, admissions inquiry, domain strategy walkthrough, and news filtering
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header Effect
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
  }

  // Smooth Scroll for Nav Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          if (navMenu && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            if (mobileToggle) mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
          }
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Number Counter Animation
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

  // News Filtering
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
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Admissions Quick Inquiry Form Handler
  const quickAdmissionsForm = document.getElementById('quickAdmissionsForm');
  if (quickAdmissionsForm) {
    quickAdmissionsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const parentName = document.getElementById('admitParentName').value;
      const studentWing = document.getElementById('admitWing').value;

      showToast(`Thank you, ${parentName}! Your inquiry for ${studentWing} has been received. Our admissions team will reach out within 24 hours.`, 'success');
      quickAdmissionsForm.reset();
    });
  }

  // General Contact Form Handler
  const contactForm = document.getElementById('mainContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      showToast(`Thank you, ${name}! Your message has been sent directly to the Destiny Seeds administration office.`, 'success');
      contactForm.reset();
    });
  }

  // Newsletter Form Handler
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for subscribing to the Destiny Seeds Monthly Digest!', 'success');
      newsletterForm.reset();
    });
  }

  // Management Presentation Guide Modal Controls
  const modalBackdrop = document.getElementById('presentationModal');
  const openModalBtns = document.querySelectorAll('.trigger-presentation-modal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modalBackdrop) modalBackdrop.classList.add('open');
    });
  });

  if (closeModalBtn && modalBackdrop) {
    closeModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('open');
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('open');
      }
    });
  }

  // Toast Notification System
  function showToast(message, type = 'success') {
    let toast = document.querySelector('.site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'site-toast';
      document.body.appendChild(toast);

      // Inject toast styles dynamically if needed
      toast.style.position = 'fixed';
      toast.style.bottom = '30px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      toast.style.background = '#0b1f48';
      toast.style.color = '#ffffff';
      toast.style.padding = '1rem 1.8rem';
      toast.style.borderRadius = '50px';
      toast.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
      toast.style.border = '2px solid #f59e0b';
      toast.style.zIndex = '3000';
      toast.style.fontSize = '0.92rem';
      toast.style.fontWeight = '600';
      toast.style.transition = 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
      toast.style.display = 'flex';
      toast.style.alignItems = 'center';
      toast.style.gap = '0.75rem';
      toast.style.maxWidth = '90%';
      toast.style.textAlign = 'center';
    }

    toast.innerHTML = `<i class="fas fa-check-circle" style="color: #10b981; font-size: 1.2rem;"></i> <span>${message}</span>`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 4500);
  }
});
