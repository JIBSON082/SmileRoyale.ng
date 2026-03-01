// ===== script.js =====
// Smile Royale Dental Home - Premium Interactions
// Scroll-triggered reveals, WhatsApp booking, navigation, and micro-interactions

(function() {
    'use strict';

    // ---------- DOM Elements ----------
    const menuIcon = document.getElementById('menuToggle');
    const navOverlay = document.getElementById('navOverlay');
    const closeNav = document.getElementById('closeNav');
    const menuBookBtn = document.getElementById('menuBookBtn');
    const whatsappBtn = document.getElementById('bookWhatsappBtn');
    const nameInput = document.getElementById('patientName');
    const serviceSelect = document.getElementById('serviceType');
    const navLinks = document.querySelectorAll('.nav-links a:not(.book-in-menu)');
    const revealElements = document.querySelectorAll('.reveal');

    // ---------- Three-Dash Menu (Overlay) Control ----------
    function openNav() {
        navOverlay.classList.add('open');
        // Prevent body scrolling when menu is open (optional)
        document.body.style.overflow = 'hidden';
    }

    function closeNavFunc() {
        navOverlay.classList.remove('open');
        // Restore body scrolling
        document.body.style.overflow = '';
    }

    if (menuIcon) {
        menuIcon.addEventListener('click', openNav);
    }

    if (closeNav) {
        closeNav.addEventListener('click', closeNavFunc);
    }

    // Close overlay when clicking outside (optional enhancement)
    navOverlay.addEventListener('click', function(e) {
        if (e.target === navOverlay) {
            closeNavFunc();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navOverlay.classList.contains('open')) {
            closeNavFunc();
        }
    });

    // ---------- Smooth Scroll for Navigation Links ----------
    // Menu book button
    if (menuBookBtn) {
        menuBookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeNavFunc();
            const bookSection = document.getElementById('book-appointment');
            if (bookSection) {
                bookSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Other nav links (Home, About us, Our services, Contact)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // remove #
            const targetEl = document.getElementById(targetId);
            
            if (targetEl) {
                closeNavFunc();
                // Small delay to allow menu to close before scrolling
                setTimeout(() => {
                    targetEl.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        });
    });

    // ---------- WhatsApp Booking with Prefilled Message ----------
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            // Get form values with fallbacks
            let patientName = nameInput ? nameInput.value.trim() : '';
            if (patientName === '') {
                patientName = 'David'; // Default as per requirement
            }
            
            let service = 'Dental Service';
            if (serviceSelect && serviceSelect.options[serviceSelect.selectedIndex]) {
                service = serviceSelect.options[serviceSelect.selectedIndex].text;
            }

            // Format the message exactly as requested:
            // "Hello, my name is 'David', I would like to...."
            const message = `Hello, my name is ${patientName}, I would like to book an appointment for ${service}.`;
            
            // Encode for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Use the provided WhatsApp booking link
            const waLink = `https://wa.me/message/KHSYINPXEPSOL1?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(waLink, '_blank');
            
            // Optional: Add subtle animation to show feedback
            this.innerHTML = '<i class="fab fa-whatsapp" style="margin-right:8px;"></i>✓ Redirecting...';
            setTimeout(() => {
                this.innerHTML = '<i class="fab fa-whatsapp" style="margin-right:8px;"></i>Send appointment → WhatsApp';
            }, 2000);
        });
    }

    // ---------- Scroll-Triggered Reveal (Intersection Observer) ----------
    // Cinematic storytelling: elements fade up as they enter viewport
    const observerOptions = {
        threshold: 0.2,        // Trigger when 20% of element is visible
        rootMargin: '0px 0px -50px 0px'  // Slight offset for better timing
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Optional: once revealed, stop observing (performance)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with .reveal class
    revealElements.forEach(el => observer.observe(el));

    // ---------- Initial Check for Elements Already Visible ----------
    // On load, activate any elements already in viewport
    window.addEventListener('load', function() {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // If element is already in viewport on load
            if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
                el.classList.add('active');
            }
        });
    });

    // ---------- Micro-Interactions: Additional Polish ----------
    
    // 1. Highlight active section in nav (optional enhancement)
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active-section');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active-section');
                    }
                });
            }
        });
    }
    
    // Optional: uncomment if you want active section highlighting
    // window.addEventListener('scroll', highlightActiveNav);
    
    // 2. Smooth reveal for service cards on hover (already in CSS)
    // 3. Parallax-like effect for hero image (already animated in CSS)
    
    // 4. Form input enhancements
    const formInputs = document.querySelectorAll('.form-group input, .form-group select');
    formInputs.forEach(input => {
        // Add floating label effect (simple version)
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // ---------- Preload Videos for Smoother Playback ----------
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Ensure videos play smoothly
        video.load();
        
        // Handle any playback errors silently
        video.addEventListener('error', function(e) {
            console.log('Video playback issue (non-critical):', e);
        });
    });

    // ---------- Handle Responsive Behavior ----------
    let resizeTimer;
    window.addEventListener('resize', function() {
        // Close mobile menu on resize above breakpoint (optional)
        if (window.innerWidth > 700 && navOverlay.classList.contains('open')) {
            closeNavFunc();
        }
        
        // Debounce scroll reveal recalculations
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Re-check visible elements after resize
            revealElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight * 0.8 && rect.bottom > 0 && !el.classList.contains('active')) {
                    el.classList.add('active');
                }
            });
        }, 250);
    });

    // ---------- Add Smooth Scroll for All Anchor Links ----------
    document.querySelectorAll('a[href^="#"]:not(.nav-links a)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

})(); // End of IIFE
