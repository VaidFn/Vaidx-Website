document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for scroll animations
    const faders = document.querySelectorAll('.animate-fade-in');
    const sliders = document.querySelectorAll('.animate-slide-up');
    const scalers = document.querySelectorAll('.animate-scale-up'); // For the calculator image

    const appearOptions = {
        threshold: 0.2, // When 20% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Adjust to trigger slightly sooner or later
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0) scale(1)"; // Reset transform for slideUp/scaleUp
                // Remove specific animation classes to prevent re-triggering (if needed)
                // For simplicity here, we let the CSS animation handle it.
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    sliders.forEach(slider => {
        appearOnScroll.observe(slider);
    });

    // Special observer for the calculator image with a slight delay if needed
    const calculatorObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "scale(1)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    scalers.forEach(scaler => {
        calculatorObserver.observe(scaler);
    });

    // Add a slight parallax effect to the hero section background (optional but nice)
    const heroSection = document.querySelector('.hero-section');
    window.addEventListener('scroll', () => {
        let scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPositionY = -scrollPosition * 0.1 + 'px'; // Adjust speed
    });
});