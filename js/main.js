/**
 * TTG Baseball Academy - Main JavaScript
 * Trust the Grind
 */

(function() {
  'use strict';

  // ===========================================
  // Header Scroll Effect
  // ===========================================
  const header = document.getElementById('header');

  function handleScroll() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ===========================================
  // Mobile Navigation
  // ===========================================
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');

  if (navToggle && navList) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navList.classList.toggle('active');
      document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navList.querySelectorAll('.nav__link').forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navList.classList.contains('active')) {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ===========================================
  // Smooth Scroll for Anchor Links
  // ===========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===========================================
  // Scroll Reveal Animation
  // ===========================================
  const revealElements = document.querySelectorAll('.reveal');

  function reveal() {
    revealElements.forEach(function(element) {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const revealPoint = 150;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }

  // Run on load and scroll
  window.addEventListener('scroll', reveal, { passive: true });
  window.addEventListener('load', reveal);

  // ===========================================
  // Animated Number Counter
  // ===========================================
  const stats = document.querySelectorAll('.stat__number');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;

    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      statsAnimated = true;

      stats.forEach(function(stat) {
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const number = parseInt(text.replace(/\D/g, ''));

        if (isNaN(number)) return;

        let current = 0;
        const increment = Math.ceil(number / 50);
        const duration = 1500;
        const stepTime = duration / (number / increment);

        const counter = setInterval(function() {
          current += increment;
          if (current >= number) {
            current = number;
            clearInterval(counter);
          }
          stat.textContent = current + (hasPlus ? '+' : '');
        }, stepTime);
      });
    }
  }

  window.addEventListener('scroll', animateStats, { passive: true });

  // ===========================================
  // Form Handling
  // ===========================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;

      // Simple loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual form handler)
      setTimeout(function() {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#22c55e';

        // Reset form
        contactForm.reset();

        // Reset button after delay
        setTimeout(function() {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // ===========================================
  // Parallax Effect on Hero
  // ===========================================
  const hero = document.querySelector('.hero');

  if (hero && window.innerWidth > 768) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const heroContent = hero.querySelector('.hero__content');

      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
      }
    }, { passive: true });
  }

  // ===========================================
  // Image Loading Enhancement
  // ===========================================
  const images = document.querySelectorAll('.coach__image');

  images.forEach(function(img) {
    img.addEventListener('load', function() {
      img.style.opacity = '1';
    });

    // If already loaded (cached)
    if (img.complete) {
      img.style.opacity = '1';
    }
  });

  // ===========================================
  // Intersection Observer for Performance
  // ===========================================
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(function(element) {
      observer.observe(element);
    });
  }

})();
