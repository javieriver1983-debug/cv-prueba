document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load

    // Carousel Logic
    const carousel = document.getElementById('carousel');
    const items = document.querySelectorAll('.carousel-item');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;

    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    const updateCarousel = () => {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateCarousel();
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    };

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-play carousel
    let autoPlay = setInterval(nextSlide, 5000);

    const stopAutoPlay = () => clearInterval(autoPlay);
    const startAutoPlay = () => autoPlay = setInterval(nextSlide, 5000);

    carousel.parentElement.addEventListener('mouseenter', stopAutoPlay);
    carousel.parentElement.addEventListener('mouseleave', startAutoPlay);

    // Mobile Menu
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('is-active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('is-active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1rem 0';
        }
    });
});
