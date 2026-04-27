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
    '.benefit-card, .cta-section__inner, .beneficios__header, .depoimentos__header, .carousel'
).forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
});

// ===== TESTIMONIALS CAROUSEL =====
(function() {
    const track = document.querySelector('.carousel__track');
    const cards = track ? track.querySelectorAll('.testimonial-card') : [];
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');
    if (!track || cards.length === 0) return;

    let currentIndex = 0;

    function getVisibleCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }

    function getMaxIndex() {
        return Math.max(0, cards.length - getVisibleCount());
    }

    function buildDots() {
        dotsContainer.innerHTML = '';
        const total = getMaxIndex() + 1;
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel__dot' + (i === currentIndex ? ' active' : '');
            dot.setAttribute('aria-label', `Ir para grupo ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        }
    }

    function goTo(index) {
        currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
        const card = cards[currentIndex];
        track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
        updateDots();
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel__dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

    // Sync dots on manual scroll/swipe
    let scrollTimer;
    track.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            const scrollLeft = track.scrollLeft;
            let closest = 0, minDist = Infinity;
            cards.forEach((card, i) => {
                const dist = Math.abs(card.offsetLeft - track.offsetLeft - scrollLeft);
                if (dist < minDist) { minDist = dist; closest = i; }
            });
            currentIndex = Math.min(closest, getMaxIndex());
            updateDots();
        }, 100);
    }, { passive: true });

    window.addEventListener('resize', () => { currentIndex = Math.min(currentIndex, getMaxIndex()); buildDots(); });
    buildDots();
})();

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
