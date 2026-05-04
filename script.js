// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburgerBtn');
const nav = document.getElementById('mainNav');

hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu on link click
nav.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const current = window.scrollY;
    header.style.boxShadow = current > 20 ? '0 2px 20px rgba(118,107,97,.1)' : 'none';
    lastScroll = current;
}, { passive: true });

// ===== SCROLL REVEAL (Intersection Observer) =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-up to animatable elements
document.querySelectorAll(
    '.hero__content, .hero__visual, .sobre__image-col, .sobre__content, ' +
    '.benefit-card, .cta-section__inner, .beneficios__header, .depoimentos__header, ' +
    '.planos__content, .planos__visual, ' +
    '.localizacao__info, .localizacao__map'
).forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.header__link[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                link.style.color = 'var(--brown)';
                link.style.fontWeight = '600';
            } else {
                link.style.color = '';
                link.style.fontWeight = '';
            }
        }
    });
}, { passive: true });
