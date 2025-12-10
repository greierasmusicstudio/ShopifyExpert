// Countdown timer pentru oferta
function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Setează data de expirare a ofertei (30 de zile de acum)
    const offerExpiry = new Date();
    offerExpiry.setDate(offerExpiry.getDate() + 30);
    
    const now = new Date();
    const timeDiff = offerExpiry.getTime() - now.getTime();
    
    // Calculează zilele rămase
    const daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
    
    countdownElement.textContent = daysRemaining;
    
    // Schimbă culoarea când mai sunt puține zile
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
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            menuBtn.innerHTML = mobileMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Închide meniul când se face click pe un link
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Închide meniul când se face click în afara
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
                mobileMenu.classList.remove('active');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Gestionează trimiterea formularului
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validează formularul
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const packageSelect = document.getElementById('package').value;
            
            if (!name || !phone || !packageSelect) {
                alert('Vă rugăm să completați toate câmpurile obligatorii!');
                return;
            }
            
            // Validare telefon (doar cifre și spații)
            const phoneRegex = /^[\d\s\+\.\-\(\)]{10,}$/;
            if (!phoneRegex.test(phone)) {
                alert('Vă rugăm să introduceți un număr de telefon valid!');
                return;
            }
            
            // Simulează trimiterea formularului
            // În producție, înlocuiește cu trimiterea reală la server sau Formspree/EmailJS
            const formData = {
                name: name,
                phone: phone,
                email: document.getElementById('email').value.trim(),
                package: packageSelect,
                business: document.getElementById('business').value.trim(),
                timestamp: new Date().toISOString()
            };
            
            console.log('Formular trimis:', formData);
            
            // Afișează mesajul de succes cu animație
            contactForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            
            // Opțional: Trimite datele la un endpoint
            // fetch('https://your-api-endpoint.com/submit', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })
            
            // Resetează formularul după 8 secunde
            setTimeout(() => {
                contactForm.reset();
                contactForm.classList.remove('hidden');
                formSuccess.classList.add('hidden');
                
                // Scroll ușor în sus pentru a vedea formularul
                contactForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 8000);
        });
    }
    
    // Setează pachetul selectat în formular când se apasă pe buton
    const packageButtons = document.querySelectorAll('.btn-package');
    packageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#contact') {
                e.preventDefault();
                const packageType = this.getAttribute('data-package');
                const packageSelect = document.getElementById('package');
                
                if (packageSelect) {
                    packageSelect.value = packageType;
                    
                    // Derulează la formular cu offset pentru navbar
                    const contactSection = document.getElementById('contact');
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const contactPosition = contactSection.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: contactPosition,
                        behavior: 'smooth'
                    });
                    
                    // Focus pe primul câmp după o scurtă întârziere
                    setTimeout(() => {
                        document.getElementById('name').focus();
                    }, 500);
                }
            }
        });
    });
}

// Funcție pentru fixarea navbar-ului la scroll
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '10px 0';
            
            if (scrollTop > lastScrollTop) {
                // Scroll down - ascunde navbar
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scroll up - arată navbar
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '20px 0';
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animare pentru elementele care apar la scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observă toate secțiunile
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
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
    
    // Setează animațiile
    setupScrollAnimations();
    
    // Actualizează countdown-ul o dată pe zi
    setInterval(updateCountdown, 86400000); // 24 de ore
    
    // Adaugă funcționalitate pentru numere de telefon (confirmație pe desktop)
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Pentru desktop, arată un popup de confirmare
            if (window.innerWidth > 768) {
                const phoneNumber = this.textContent.trim();
                if (!confirm(`Doriți să sunați la ${phoneNumber}?`)) {
                    e.preventDefault();
                }
            }
        });
    });
    
    // Smooth scroll pentru link-uri interne
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
});

// Adaugă clase CSS pentru animații
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
    
    section {
        opacity: 0;
    }
    
    .hero {
        opacity: 1 !important;
    }
`;
document.head.appendChild(style);