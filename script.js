/* =============================================
   SHOPIFY EXPERT — script.js v4.0
   ============================================= */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initFAQ();
    initCountdown();
    initPackageCTA();
});

/* ── NAVBAR: backdrop shadow on scroll ─── */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const onScroll = () => {
        navbar.style.boxShadow = window.scrollY > 50
            ? '0 2px 24px rgba(0,0,0,0.5)'
            : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── MOBILE HAMBURGER MENU ───────────────── */
function initMobileMenu() {
    const btn    = document.getElementById('hamburger');
    const drawer = document.getElementById('mobileDrawer');
    if (!btn || !drawer) return;

    const close = () => {
        drawer.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
    };

    btn.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = drawer.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
        btn.setAttribute('aria-expanded', isOpen);
        drawer.setAttribute('aria-hidden', !isOpen);
    });

    // Close on any drawer link click
    drawer.querySelectorAll('.drawer-link, .btn').forEach(el => {
        el.addEventListener('click', close);
    });

    // Close on outside tap
    document.addEventListener('click', e => {
        if (!btn.contains(e.target) && !drawer.contains(e.target)) close();
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') close();
    });
}

/* ── SMOOTH SCROLL ───────────────────────── */
function initSmoothScroll() {
    const navH = document.getElementById('navbar')?.offsetHeight || 68;

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

/* ── FAQ ACCORDION ───────────────────────── */
function initFAQ() {
    const items = document.querySelectorAll('.faq-item');

    items.forEach(item => {
        const btn   = item.querySelector('.faq-btn');
        const panel = item.querySelector('.faq-panel');
        if (!btn || !panel) return;

        btn.addEventListener('click', () => {
            const isOpen = btn.getAttribute('aria-expanded') === 'true';

            // Close all others
            items.forEach(other => {
                const ob = other.querySelector('.faq-btn');
                const op = other.querySelector('.faq-panel');
                if (ob && op && ob !== btn) {
                    ob.setAttribute('aria-expanded', 'false');
                    op.style.maxHeight = null;
                }
            });

            // Toggle clicked
            const open = !isOpen;
            btn.setAttribute('aria-expanded', open);
            panel.style.maxHeight = open ? panel.scrollHeight + 'px' : null;
        });
    });
}

/* ── COUNTDOWN TIMER ─────────────────────── */
function initCountdown() {
    const el = document.getElementById('countdown');
    if (!el) return;

    // Store expiry in sessionStorage so it persists page reloads
    let expiry = sessionStorage.getItem('offerExpiry');
    if (!expiry) {
        expiry = Date.now() + 30 * 24 * 60 * 60 * 1000;
        sessionStorage.setItem('offerExpiry', expiry);
    }

    const update = () => {
        const diff = parseInt(expiry) - Date.now();
        const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
        el.textContent = days;
        if (days <= 5) el.style.color = '#ef4444';
    };

    update();
    setInterval(update, 60_000);
}

/* ── PACKAGE CTA ─────────────────────────── */
function initPackageCTA() {
    document.querySelectorAll('[data-package]').forEach(btn => {
        btn.addEventListener('click', function () {
            sessionStorage.setItem('selectedPackage', this.dataset.package);
        });
    });
}