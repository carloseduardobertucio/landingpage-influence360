// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form validation
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const formData = new FormData(this);
        let isValid = true;
        
        for (let [key, value] of formData.entries()) {
            if (!value && key !== 'observacao') {
                isValid = false;
                const input = this.querySelector(`[name="${key}"]`);
                input.classList.add('error');
            }
        }
        
        if (isValid) {
            // Here you would typically send the form data to your server
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });
}

// Remove error class on input focus
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.classList.remove('error');
    });
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Menu Mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
} 