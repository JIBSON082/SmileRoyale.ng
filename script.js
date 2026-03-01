// === script.js - Premium Interactions ===
(function() {
    'use strict';

    // DOM Elements
    const menuIcon = document.getElementById('menuToggle');
    const navOverlay = document.getElementById('navOverlay');
    const closeNav = document.getElementById('closeNav');
    const menuBookBtn = document.getElementById('menuBookBtn');
    const whatsappBtn = document.getElementById('bookWhatsappBtn');
    const nameInput = document.getElementById('patientName');
    const serviceSelect = document.getElementById('serviceType');
    const navLinks = document.querySelectorAll('.nav-links a:not(.book-in-menu)');
    const revealElements = document.querySelectorAll('.reveal');

    // Menu Controls
    function openNav() { 
        navOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeNavFunc() { 
        navOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (menuIcon) menuIcon.addEventListener('click', openNav);
    if (closeNav) closeNav.addEventListener('click', closeNavFunc);

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navOverlay.classList.contains('open')) {
            closeNavFunc();
        }
    });

    // Close when clicking outside
    navOverlay.addEventListener('click', function(e) {
        if (e.target === navOverlay) closeNavFunc();
    });

    // Menu book button
    if (menuBookBtn) {
        menuBookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeNavFunc();
            const bookSection = document.getElementById('book-appointment');
            if (bookSection) {
                bookSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Other nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                closeNavFunc();
                setTimeout(() => {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        });
    });

    // WhatsApp Booking
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            let patientName = nameInput ? nameInput.value.trim() : 'David';
            if (patientName === '') patientName = 'David';
            
            let service = 'Dental Service';
            if (serviceSelect && serviceSelect.options[serviceSelect.selectedIndex]) {
                service = serviceSelect.options[serviceSelect.selectedIndex].text;
            }

            const message = `Hello, my name is ${patientName}, I would like to book an appointment for ${service}.`;
            const encodedMessage = encodeURIComponent(message);
            const waLink = `https://wa.me/message/KHSYINPXEPSOL1?text=${encodedMessage}`;
            
            window.open(waLink, '_blank');
            
            // Button feedback
            this.innerHTML = '<i class="fab fa-whatsapp" style="margin-right:8px;"></i>✓ Redirecting...';
            setTimeout(() => {
                this.innerHTML = '<i class="fab fa-whatsapp" style="margin-right:8px;"></i>Send appointment → WhatsApp';
            }, 2000);
        });
    }

    // Scroll-Triggered Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => observer.observe(el));

    // Check for elements already visible on load
    window.addEventListener('load', function() {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
                el.classList.add('active');
            }
        });
    });

    // Video handling
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.load();
        video.addEventListener('error', function(e) {
            console.log('Video playback issue (non-critical):', e);
        });
    });

})();