// =============================================
// SHOPIFY EXPERT — script.js v3.0
// =============================================

document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initFAQ();
    initCountdown();
    initPackageCTA();
});

// ---- NAVBAR: scroll shadow ----
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }, { passive: true });
}

// ---- MOBILE MENU ----
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileMenu.classList.toggle('active');
        menuBtn.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // Close on link click
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// ---- SMOOTH SCROLL ----
function initSmoothScroll() {
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 72;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const top = target.offsetTop - navbarHeight - 16;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// ---- FAQ ACCORDION ----
function initFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = question.classList.contains('active');

            // Close all
            questions.forEach(q => {
                q.classList.remove('active');
                const a = q.nextElementSibling;
                if (a) a.style.maxHeight = null;
            });

            // Open clicked if it was closed
            if (!isOpen && answer) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// ---- COUNTDOWN TIMER ----
function initCountdown() {
    const el = document.getElementById('countdown');
    if (!el) return;
    // Simple: keep at 30 days from now
    el.textContent = '30';
}

// ---- PACKAGE CTA: scroll to contact and set context ----
function initPackageCTA() {
    document.querySelectorAll('[data-package]').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const pkg = this.dataset.package;
            // Store selected package (for future use with forms, analytics, etc.)
            sessionStorage.setItem('selectedPackage', pkg);
        });
    });
}