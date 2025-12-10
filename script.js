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
}

// Gestionează trimiterea formularului
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    
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
            
            // Simulează trimiterea formularului
            // În producție, înlocuiește cu trimiterea reală la server sau Formspree
            console.log('Formular trimis:', {
                name,
                phone,
                email: document.getElementById('email').value,
                package: packageSelect,
                business: document.getElementById('business').value
            });
            
            // Afișează mesajul de succes
            contactForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            
            // Resetează formularul după 5 secunde (pentru teste)
            setTimeout(() => {
                contactForm.reset();
                contactForm.classList.remove('hidden');
                formSuccess.classList.add('hidden');
            }, 5000);
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
                    
                    // Derulează la formular
                    document.getElementById('contact').scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Focus pe primul câmp
                    document.getElementById('name').focus();
                }
            }
        });
    });
    
    // Actualizează countdown-ul la fiecare zi
    setInterval(updateCountdown, 86400000); // 24 de ore
});

// Adaugă funcționalitate pentru numere de telefon
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Pentru desktop, ar putea deschide un popup pentru a confirma apelul
        if (window.innerWidth > 768) {
            if (!confirm(`Sună la ${this.textContent.trim()}?`)) {
                e.preventDefault();
            }
        }
    });
});