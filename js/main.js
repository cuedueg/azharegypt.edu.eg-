document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Mobile Navigation Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Cairo Clock Widget
    const clockElement = document.getElementById('cairoClock');
    if (clockElement) {
        function updateClock() {
            // Cairo time is typically UTC+2 or UTC+3 (Daylight savings).
            // Easiest is to use JS native Intl.DateTimeFormat
            const options = { 
                timeZone: 'Africa/Cairo', 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true 
            };
            const formatter = new Intl.DateTimeFormat('ar-EG', options);
            clockElement.textContent = formatter.format(new Date());
        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    // 3. Carousel Slider
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            slides[index].classList.add('active');
            if (dots.length > index) {
                dots[index].classList.add('active');
            }
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function startSlide() {
            slideInterval = setInterval(nextSlide, 5000); // 5 seconds per slide
        }

        function resetSlide() {
            clearInterval(slideInterval);
            startSlide();
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                resetSlide();
            });
        });

        // Initialize
        showSlide(0);
        startSlide();
    }

    // 4. Accordions for Courses
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        const header = card.querySelector('.course-header');
        if (header) {
            header.addEventListener('click', () => {
                // Toggle current card
                const isActive = card.classList.contains('active');
                
                // Optional: Close other cards (Accordion style)
                /*
                courseCards.forEach(c => {
                    c.classList.remove('active');
                });
                */

                if (!isActive) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        }
    });

});
