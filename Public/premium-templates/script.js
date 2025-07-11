    let slideIndex = 0;
    const showSlides = (n) => {
        const slides = document.querySelectorAll('.slideshow-container .slide');
        const dots = document.querySelectorAll('.slideshow-dots .dot');
        if (n >= slides.length) slideIndex = 0;
        if (n < 0) slideIndex = slides.length - 1;
        slides.forEach((slide, i) => {
            slide.style.display = (i === slideIndex) ? 'block' : 'none';
        });
        dots.forEach((dot, i) => {
            dot.className = dot.className.replace(' active', '');
            if (i === slideIndex) dot.className += ' active';
        });
    };
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    document.addEventListener('DOMContentLoaded', () => {
        const prev = document.querySelector('.slideshow-container .prev');
        const next = document.querySelector('.slideshow-container .next');
        const dots = document.querySelectorAll('.slideshow-dots .dot');
        prev.addEventListener('click', () => plusSlides(-1));
        next.addEventListener('click', () => plusSlides(1));
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => currentSlide(i));
        });
        showSlides(slideIndex);
        // Optional: auto-slide
        setInterval(() => { plusSlides(1); }, 4000);

        // Drag/swipe support
        const slideshow = document.querySelector('.slideshow-container');
        let startX = 0;
        let isDragging = false;

        // Mouse events
        slideshow.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
        });
        slideshow.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            // Prevent text/image selection while dragging
            e.preventDefault();
        });
        slideshow.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            let diff = e.clientX - startX;
            if (Math.abs(diff) > 50) {
                if (diff < 0) plusSlides(1);
                else plusSlides(-1);
            }
            isDragging = false;
        });
        slideshow.addEventListener('mouseleave', () => {
            isDragging = false;
        });

        // Touch events
        slideshow.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                startX = e.touches[0].clientX;
                isDragging = true;
            }
        });
        slideshow.addEventListener('touchmove', (e) => {
            // Prevent scrolling when swiping
            if (isDragging) e.preventDefault();
        }, { passive: false });
        slideshow.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            let endX = e.changedTouches[0].clientX;
            let diff = endX - startX;
            if (Math.abs(diff) > 50) {
                if (diff < 0) plusSlides(1);
                else plusSlides(-1);
            }
            isDragging = false;
        });
    });