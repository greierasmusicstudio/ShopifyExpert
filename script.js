'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initMobileMenu();
    initSmoothScroll();
    initFAQ();
    initCountdown();
});

/* Navbar shadow on scroll */
function initNavScroll() {
    const hdr = document.getElementById('header');
    if (!hdr) return;
    window.addEventListener('scroll', () => {
        hdr.style.boxShadow = window.scrollY > 40
            ? '0 2px 30px rgba(0,0,0,0.6)' : 'none';
    }, { passive: true });
}

/* Mobile burger menu */
function initMobileMenu() {
    const btn  = document.getElementById('burgerBtn');
    const nav  = document.getElementById('mobileNav');
    const ico  = document.getElementById('burgerIcon');
    if (!btn || !nav) return;

    const close = () => {
        nav.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
        ico.className = 'fas fa-bars';
    };

    btn.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = !nav.hidden;
        if (isOpen) {
            close();
        } else {
            nav.hidden = false;
            btn.setAttribute('aria-expanded', 'true');
            ico.className = 'fas fa-times';
        }
    });

    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('click', e => {
        if (!btn.contains(e.target) && !nav.contains(e.target)) close();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* Smooth scroll with offset */
function initSmoothScroll() {
    const offset = document.getElementById('header')?.offsetHeight || 66;
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const el = document.querySelector(id);
            if (!el) return;
            e.preventDefault();
            window.scrollTo({
                top: el.getBoundingClientRect().top + window.scrollY - offset - 10,
                behavior: 'smooth'
            });
        });
    });
}

/* FAQ accordion */
function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const btn   = item.querySelector('.faq-q');
        const panel = item.querySelector('.faq-a');
        if (!btn || !panel) return;

        btn.addEventListener('click', () => {
            const open = btn.getAttribute('aria-expanded') === 'true';

            // close all
            document.querySelectorAll('.faq-q').forEach(b => {
                b.setAttribute('aria-expanded', 'false');
                const p = b.closest('.faq-item')?.querySelector('.faq-a');
                if (p) p.style.maxHeight = null;
            });

            if (!open) {
                btn.setAttribute('aria-expanded', 'true');
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });
}

/* Countdown */
function initCountdown() {
    const el = document.getElementById('countdown');
    if (!el) return;
    let exp = sessionStorage.getItem('offerExp');
    if (!exp) {
        exp = Date.now() + 30 * 864e5;
        sessionStorage.setItem('offerExp', exp);
    }
    const tick = () => {
        const d = Math.max(0, Math.ceil((+exp - Date.now()) / 864e5));
        el.textContent = d;
        if (d <= 5) el.style.color = '#ef4444';
    };
    tick();
    setInterval(tick, 6e4);
}