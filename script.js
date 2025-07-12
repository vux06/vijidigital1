document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initCarousel();
    initPortfolio();
    initContactForm();
    initScrollAnimations();
    initTestimonials();
    initScrollEffects();
});

// ===== NAVIGATION =====
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
}

// ===== CAROUSEL FUNCTIONALITY =====
function initCarousel() {
    const carousel = document.getElementById('featuredCarousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!track || slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto-play carousel
    setInterval(nextSlide, 5000);

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

// ===== PORTFOLIO FUNCTIONALITY =====
function initPortfolio() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Portfolio filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize lightbox functionality
    initLightbox();
}

// ===== LIGHTBOX FUNCTIONALITY =====
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxDescription = document.getElementById('lightboxDescription');

    let currentImages = [];
    let currentIndex = 0;

    // Portfolio item descriptions
    const portfolioData = {
        'Romantic Garden Wedding': 'A beautiful outdoor ceremony captured in golden hour light with natural, candid moments.',
        'Elegant Ballroom Celebration': 'Sophisticated indoor reception with dramatic lighting and elegant décor photography.',
        'Beach Wedding Ceremony': 'Intimate seaside vows with stunning ocean backdrop and natural beach lighting.',
        'Vintage Style Wedding': 'Classic photography style with timeless poses and artistic composition.',
        'Outdoor Mountain Wedding': 'Breathtaking alpine ceremony with panoramic landscape views.',
        'Traditional Church Wedding': 'Sacred ceremony documentation with respectful, artistic photography.',
        'Rustic Barn Wedding': 'Charming countryside celebration with warm, natural lighting.',
        'Modern City Wedding': 'Contemporary urban ceremony with architectural elements and city views.',
        'Corporate Conference': 'Professional event coverage with multiple speakers and networking sessions.',
        'Music Festival Coverage': 'Dynamic performance documentation with stage lighting and crowd energy.',
        'Graduation Ceremony': 'Milestone celebration capturing the joy and achievement of graduates.',
        'Birthday Celebration': 'Personal milestone event with family moments and candid interactions.',
        'Product Launch Event': 'Corporate event showcasing new product with professional presentation coverage.',
        'Cultural Festival': 'Vibrant community celebration with traditional performances and cultural displays.',
        'Coastal Aerial View': 'Stunning overhead perspective of coastline with crystal clear waters.',
        'Mountain Landscape': 'Majestic aerial footage of mountain ranges and natural terrain.',
        'Urban Cityscape': 'Dynamic overhead view of city architecture and urban planning.',
        'Forest Canopy View': 'Unique perspective of dense forest from above showing natural patterns.',
        'Conference Live Stream': 'Multi-camera professional broadcast of corporate conference to global audience.',
        'Musical Performance Stream': 'High-quality live streaming of musical concert with professional audio.',
        'Educational Webinar': 'Interactive online seminar with professional presentation and Q&A session.',
        'Wedding Reception Banner': 'Custom-designed banner for wedding reception with elegant typography and romantic themes.',
        'Corporate Event Backdrop': 'Professional backdrop design for corporate events with brand integration and modern aesthetics.',
        'Birthday Celebration Banner': 'Colorful and festive banner design for birthday parties with personalized messaging.',
        'Festival Signage Package': 'Complete signage solution for festivals including directional signs, banners, and promotional materials.'
    };

    window.openLightbox = function(button) {
        const portfolioItem = button.closest('.portfolio-item');
        const img = portfolioItem.querySelector('img');
        const title = portfolioItem.querySelector('h3').textContent;
        const category = portfolioItem.querySelector('p').textContent;

        // Gather all visible portfolio images for navigation
        const visibleItems = Array.from(document.querySelectorAll('.portfolio-item')).filter(item => {
            return window.getComputedStyle(item).display !== 'none';
        });

        currentImages = visibleItems.map(item => ({
            src: item.querySelector('img').src,
            title: item.querySelector('h3').textContent,
            category: item.querySelector('p').textContent,
            description: portfolioData[item.querySelector('h3').textContent] || 'Professional photography and videography services.'
        }));

        currentIndex = currentImages.findIndex(image => image.src === img.src);

        updateLightboxContent();
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    window.nextImage = function() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateLightboxContent();
    };

    window.prevImage = function() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateLightboxContent();
    };

    function updateLightboxContent() {
        const currentImage = currentImages[currentIndex];
        lightboxImage.src = currentImage.src;
        lightboxTitle.textContent = currentImage.title;
        lightboxCategory.textContent = currentImage.category;
        lightboxDescription.textContent = currentImage.description;
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        clearErrors();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Hide form and show success message
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';

            // Reset form after success
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                successMessage.style.display = 'none';
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }, 5000);
        }, 2000);
    });

    function validateForm() {
        let isValid = true;
        const requiredFields = ['firstName', 'lastName', 'email', 'service', 'message'];

        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const value = field.value.trim();

            if (!value) {
                showError(fieldName, 'This field is required');
                isValid = false;
            } else {
                // Additional validation
                switch(fieldName) {
                    case 'email':
                        if (!isValidEmail(value)) {
                            showError(fieldName, 'Please enter a valid email address');
                            isValid = false;
                        }
                        break;
                    case 'message':
                        if (value.length < 10) {
                            showError(fieldName, 'Please provide more details (minimum 10 characters)');
                            isValid = false;
                        }
                        break;
                }
            }
        });

        // Validate phone if provided
        const phone = document.getElementById('phone').value.trim();
        if (phone && !isValidPhone(phone)) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }

        // Validate event date if provided
        const eventDate = document.getElementById('eventDate').value;
        if (eventDate) {
            const selectedDate = new Date(eventDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                showError('eventDate', 'Event date cannot be in the past');
                isValid = false;
            }
        }

        return isValid;
    }

    function showError(fieldName, message) {
        const errorElement = document.getElementById(fieldName + 'Error');
        const field = document.getElementById(fieldName);

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        if (field) {
            field.style.borderColor = '#e74c3c';
        }
    }

    function clearErrors() {
        const errorElements = contactForm.querySelectorAll('.error-message');
        const fields = contactForm.querySelectorAll('input, select, textarea');

        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });

        fields.forEach(field => {
            field.style.borderColor = '#eee';
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const fieldName = this.id;
            if (fieldName) {
                const errorElement = document.getElementById(fieldName + 'Error');
                if (errorElement && errorElement.textContent) {
                    // Re-validate this field
                    validateSingleField(fieldName);
                }
            }
        });
    });

    function validateSingleField(fieldName) {
        const field = document.getElementById(fieldName);
        const value = field.value.trim();
        const errorElement = document.getElementById(fieldName + 'Error');

        // Clear previous error
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        field.style.borderColor = '#eee';

        // Validate based on field type
        switch(fieldName) {
            case 'firstName':
            case 'lastName':
            case 'service':
            case 'message':
                if (!value) {
                    showError(fieldName, 'This field is required');
                    return false;
                }
                if (fieldName === 'message' && value.length < 10) {
                    showError(fieldName, 'Please provide more details (minimum 10 characters)');
                    return false;
                }
                break;
            case 'email':
                if (!value) {
                    showError(fieldName, 'This field is required');
                    return false;
                }
                if (!isValidEmail(value)) {
                    showError(fieldName, 'Please enter a valid email address');
                    return false;
                }
                break;
            case 'phone':
                if (value && !isValidPhone(value)) {
                    showError(fieldName, 'Please enter a valid phone number');
                    return false;
                }
                break;
        }
        return true;
    }
}

// ===== TESTIMONIALS CAROUSEL =====
function initTestimonials() {
    const testimonialTrack = document.getElementById('testimonialTrack');
    if (!testimonialTrack) return;

    const testimonials = testimonialTrack.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;

    function updateTestimonialCarousel() {
        const translateX = -currentTestimonial * 100;
        testimonialTrack.style.transform = `translateX(${translateX}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });
    }

    window.currentTestimonial = function(index) {
        currentTestimonial = index - 1;
        updateTestimonialCarousel();
    };

    // Auto-play testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonialCarousel();
    }, 6000);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .team-member, .value-card, .stat-item, .testimonial, .faq-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .portfolio-item, .team-member, .value-card, .stat-item, .testimonial, .faq-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .stat-item.animate-in .stat-number {
            animation: countUp 2s ease;
        }
        
        @keyframes countUp {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const suffix = counter.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current) + suffix;
            }, 20);
        });
    }

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }
}

// ===== UTILITY FUNCTIONS =====

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Format phone number
function formatPhoneNumber(value) {
    const phoneNumber = value.replace(/\D/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

// Add phone formatting to phone input
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        const formatted = formatPhoneNumber(this.value);
        this.value = formatted;
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


const debouncedScrollHandler = debounce(function() {
  
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

