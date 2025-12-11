// Countdown timer pentru oferta
function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    const offerExpiry = new Date();
    offerExpiry.setDate(offerExpiry.getDate() + 30);
    
    const now = new Date();
    const timeDiff = offerExpiry.getTime() - now.getTime();
    
    const daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
    
    countdownElement.textContent = daysRemaining;
    
    if (daysRemaining <= 7) {
        countdownElement.style.color = '#ff6b6b';
        countdownElement.style.fontWeight = '900';
    }
}

// Meniu mobil optimizat
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            menuBtn.innerHTML = mobileMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Închide meniul la click în afară
        document.addEventListener('click', function(event) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(event.target) && 
                !menuBtn.contains(event.target)) {
                mobileMenu.classList.remove('active');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Google Forms Integration - REPARAT
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');
    const submitBtn = form ? form.querySelector('.btn-submit') : null;
    
    if (!form || !submitBtn) return;
    
    // Selectarea automată a pachetului dacă venim din butoane
    document.querySelectorAll('.btn-package').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pkg = btn.getAttribute('data-package');
            const select = document.getElementById('package');
            if(select) {
                // Mapare simplă valori
                if(pkg === 'basic') select.selectedIndex = 1;
                if(pkg === 'plus') select.selectedIndex = 2;
                if(pkg === 'top') select.selectedIndex = 3;
            }
        });
    });

    // Gestionare submit
    form.addEventListener('submit', function(e) {
        // Validare de bază
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const packageSelected = document.getElementById('package').value;
        
        if (!name || !phone || !packageSelected) {
            e.preventDefault(); 
            alert('Vă rugăm să completați toate câmpurile obligatorii!');
            return;
        }
        
        if (phone.length < 10) {
            e.preventDefault();
            alert('Vă rugăm să introduceți un număr de telefon valid!');
            return;
        }
        
        // Dacă e valid, lăsăm formularul să se trimită către iframe (NU dăm preventDefault)
        // Dar schimbăm UI-ul imediat
        
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Se trimite...';
        submitBtn.disabled = true;
        
        // Așteptăm puțin ca datele să plece, apoi arătăm succesul
        setTimeout(() => {
            form.style.display = 'none';
            if (successMessage) {
                successMessage.classList.remove('hidden');
                successMessage.style.display = 'flex';
            }
            form.reset();
            
            // Re-activare buton pentru viitor
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Fix pentru navbar la scroll
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    });
}

// Smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Inițializare
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    setupMobileMenu();
    setupContactForm();
    setupNavbarScroll();
    setupSmoothScroll();
});