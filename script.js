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

// Meniu mobil
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
        
        document.addEventListener('click', function(event) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(event.target) && 
                !menuBtn.contains(event.target)) {
                mobileMenu.classList.remove('active');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        window.addEventListener('scroll', function() {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Google Forms Integration
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');
    const submitBtn = form ? form.querySelector('.btn-submit') : null;
    
    if (!form || !submitBtn) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validare
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const package = document.getElementById('package').value;
        
        if (!name || !phone || !package) {
            alert('Vă rugăm să completați toate câmpurile obligatorii!');
            return;
        }
        
        // Validare telefon
        const phoneRegex = /^[\d\s\+\.\-\(\)]{10,}$/;
        if (!phoneRegex.test(phone)) {
            alert('Vă rugăm să introduceți un număr de telefon valid!');
            return;
        }
        
        // Loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Se trimite...';
        submitBtn.disabled = true;
        
        // Trimite la Google Forms
        setTimeout(() => {
            // Arată mesaj de succes
            form.style.display = 'none';
            if (successMessage) successMessage.style.display = 'block';
            
            // Trimite formularul efectiv
            form.submit();
            
            // Resetează după 8 secunde
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                if (successMessage) successMessage.style.display = 'none';
            }, 8000);
            
            // Reset buton
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// Fix pentru navbar la scroll
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            
            if (scrollTop > lastScrollTop && window.innerWidth < 768) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Smooth scroll pentru link-uri interne
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
                
                // Închide meniul mobil dacă este deschis
                const mobileMenu = document.querySelector('.mobile-menu');
                const menuBtn = document.querySelector('.mobile-menu-btn');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
}

// Inițializare la încărcarea paginii
document.addEventListener('DOMContentLoaded', function() {
    // Inițializează countdown-ul
    updateCountdown();
    
    // Setează meniul mobil
    setupMobileMenu();
    
    // Setează formularul de contact
    setupContactForm();
    
    // Setează navbar scroll
    setupNavbarScroll();
    
    // Setează smooth scroll
    setupSmoothScroll();
    
    // Actualizează countdown-ul o dată pe zi
    setInterval(updateCountdown, 86400000); // 24 de ore
});

// Adaugă CSS pentru animații
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    section:not(.hero) {
        opacity: 0;
    }
    
    .hero {
        opacity: 1 !important;
    }
`;
document.head.appendChild(style);