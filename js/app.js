/**
 * app.js — Main Application Script
 * Machine Design AI Assistant
 *
 * Modules:
 *  1. Mobile Navigation
 *  2. Smooth Scroll
 *  3. Contact Form Validation
 *  4. Stats Counter Animation
 *  5. Footer Year
 *  6. Intersection Observer (reveal-on-scroll)
 */

'use strict';

/* ─── Utility ───────────────────────────────────────────────── */

/**
 * Safely select a DOM element.
 * @param {string} selector
 * @param {Element} [scope=document]
 * @returns {Element|null}
 */
const $ = (selector, scope = document) => scope.querySelector(selector);

/**
 * Safely select all matching DOM elements.
 * @param {string} selector
 * @param {Element} [scope=document]
 * @returns {NodeList}
 */
const $$ = (selector, scope = document) => scope.querySelectorAll(selector);

/**
 * Run a callback once the DOM is ready.
 * @param {Function} fn
 */
const onReady = (fn) => {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
};

/* ─── 1. Mobile Navigation ──────────────────────────────────── */

function initMobileNav() {
  const toggle = $('.nav__toggle');
  const menu   = $('#nav-menu');

  if (!toggle || !menu) return;

  const open = () => {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  const close = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? close() : open();
  });

  // Close on nav link click
  $$('.nav__link', menu).forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && menu.classList.contains('is-open')) close();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      close();
      toggle.focus();
    }
  });
}

/* ─── 2. Smooth Scroll with Header Offset ───────────────────── */

function initSmoothScroll() {
  const header = $('.site-header');

  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = $(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = header ? header.offsetHeight + 16 : 0;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
}

/* ─── 3. Contact Form Validation ────────────────────────────── */

function initContactForm() {
  const form    = $('#contact-form');
  const success = $('#form-success');
  if (!form) return;

  const validators = {
    name: (v) => v.trim().length >= 2 ? '' : 'Please enter your full name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
    message: (v) => v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.',
  };

  /**
   * Validate a single field and update its UI.
   * @param {HTMLInputElement|HTMLTextAreaElement} field
   * @returns {boolean}
   */
  function validateField(field) {
    const rule  = validators[field.name];
    const error = rule ? rule(field.value) : '';
    const errorEl = field.parentElement.querySelector('.form-error');

    if (error) {
      field.classList.add('is-invalid');
      field.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = error;
    } else {
      field.classList.remove('is-invalid');
      field.setAttribute('aria-invalid', 'false');
      if (errorEl) errorEl.textContent = '';
    }

    return !error;
  }

  // Validate on blur for real-time feedback
  $$('[name]', form).forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('is-invalid')) validateField(field);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields  = Array.from($$('[name]', form));
    const isValid = fields.map(validateField).every(Boolean);
    if (!isValid) {
      const firstInvalid = fields.find(f => f.classList.contains('is-invalid'));
      firstInvalid?.focus();
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';

    try {
      // Replace this with your actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1200));

      form.reset();
      if (success) {
        success.hidden = false;
        setTimeout(() => { success.hidden = true; }, 6000);
      }
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

/* ─── 4. Stats Counter Animation ────────────────────────────── */

function initStatsCounter() {
  const counters = $$('[data-target]');
  if (!counters.length) return;

  const duration = 1800; // ms

  /**
   * Animate a counter from 0 to its target value.
   * @param {Element} el
   */
  function animateCounter(el) {
    const target  = parseInt(el.dataset.target, 10);
    const start   = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ─── 5. Footer Year ─────────────────────────────────────────── */

function initFooterYear() {
  const el = $('#footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ─── 6. Reveal on Scroll ────────────────────────────────────── */

function initRevealOnScroll() {
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
    .reveal.is-visible { opacity: 1; transform: none; }
  `;
  document.head.appendChild(style);

  // Tag feature cards and stat blocks
  $$('.feature-card, .stat').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 60}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  $$('.reveal').forEach(el => observer.observe(el));
}

/* ─── Boot ───────────────────────────────────────────────────── */

onReady(() => {
  initMobileNav();
  initSmoothScroll();
  initContactForm();
  initStatsCounter();
  initFooterYear();
  initRevealOnScroll();

  console.info('[Machine Design AI] App initialised ✓');
});
