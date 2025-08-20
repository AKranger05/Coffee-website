// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Menu section reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's the menu section, also animate the menu items
                if (entry.target.classList.contains('menu-section')) {
                    animateMenuItems();
                }
            }
        });
    }, observerOptions);

    // Observe menu section
    const menuSection = document.querySelector('.menu-section');
    if (menuSection) {
        observer.observe(menuSection);
    }

    // Function to animate menu items one by one
    function animateMenuItems() {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100);
        });
    }

    // Menu item click handlers - Updated to handle new buttons
    document.querySelectorAll('.menu-item').forEach(item => {
        // Remove the old click handler for the entire menu item
        // We'll handle button clicks individually now
    });

    // Learn More button handlers
    document.querySelectorAll('.learn-more-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            const coffeeType = this.getAttribute('data-coffee');
            const coffeeItem = this.closest('.menu-item');
            const coffeeName = coffeeItem.querySelector('h3').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // You can add navigation to individual coffee pages here
            alert(`Learn More about ${coffeeName}! Individual coffee pages will be added later.`);
            console.log(`Learn More clicked for: ${coffeeType}`);
        });
    });

    // Order Now button handlers
    document.querySelectorAll('.order-now-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            const coffeeType = this.getAttribute('data-coffee');
            const coffeeItem = this.closest('.menu-item');
            const coffeeName = coffeeItem.querySelector('h3').textContent;
            const price = coffeeItem.querySelector('.price').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // You can add cart functionality here later
            alert(`${coffeeName} added to cart! Price: ${price}`);
            console.log(`Order Now clicked for: ${coffeeType}`);
        });
    });

    // Footer link handlers (placeholder for future pages)
    document.querySelectorAll('.footer-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const linkText = this.textContent;
            
            // Add click animation
            this.style.transform = 'translateX(10px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Placeholder for future page navigation
            alert(`${linkText} page will be added later!`);
            console.log(`Footer link clicked: ${href}`);
        });
    });

    // Add some dynamic floating coffee elements
    function createFloatingElement() {
        const element = document.createElement('div');
        element.style.position = 'fixed';
        element.style.width = Math.random() * 8 + 4 + 'px';
        element.style.height = element.style.width;
        element.style.background = `rgba(212, 175, 55, ${Math.random() * 0.4 + 0.1})`;
        element.style.borderRadius = '50%';
        element.style.left = Math.random() * 100 + 'vw';
        element.style.top = '100vh';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '1';
        element.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.3)';
        
        document.body.appendChild(element);
        
        const duration = Math.random() * 8000 + 12000;
        const drift = (Math.random() - 0.5) * 150;
        
        element.animate([
            { 
                transform: `translateY(0) translateX(0) scale(0)`, 
                opacity: 0 
            },
            { 
                transform: `translateY(-50vh) translateX(${drift * 0.5}px) scale(1)`, 
                opacity: 1 
            },
            { 
                transform: `translateY(-110vh) translateX(${drift}px) scale(0.5)`, 
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => element.remove();
    }

    // Create floating elements periodically
    setInterval(createFloatingElement, 4000);

    // Add parallax effect to hero section
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Enhanced hover effects for menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (this.classList.contains('visible')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (this.classList.contains('visible')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Add typing effect to hero title
    function typeWriter(element, text, speed = 80) {
        let i = 0;
        element.innerHTML = '';
        element.style.borderRight = '3px solid #d4af37';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        type();
    }

    // Initialize typing effect when page loads
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100);
        }, 800);
    }

    // Add smooth reveal for scroll indicator
    setTimeout(() => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }
    }, 2000);

    // Hide scroll indicator when scrolling starts
    let scrollTimer = null;
    window.addEventListener('scroll', () => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator && window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        } else if (scrollIndicator && window.pageYOffset <= 100) {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }
    });

    // Button interaction enhancements
    function addButtonRippleEffect(button, event) {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to { transform: scale(2); opacity: 0; }
            }
        `;
        if (!document.querySelector('[data-ripple-style]')) {
            style.setAttribute('data-ripple-style', 'true');
            document.head.appendChild(style);
        }
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple effect to all buttons
    document.querySelectorAll('.learn-more-btn, .order-now-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            addButtonRippleEffect(this, e);
        });
    });

    // Smooth footer animation on scroll
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const footerColumns = entry.target.querySelectorAll('.footer-column');
                footerColumns.forEach((column, index) => {
                    setTimeout(() => {
                        column.style.opacity = '1';
                        column.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.2 });

    const footerSection = document.querySelector('.footer-section');
    if (footerSection) {
        // Initially hide footer columns
        const footerColumns = footerSection.querySelectorAll('.footer-column');
        footerColumns.forEach(column => {
            column.style.opacity = '0';
            column.style.transform = 'translateY(30px)';
            column.style.transition = 'all 0.6s ease';
        });
        
        footerObserver.observe(footerSection);
    }

});

// Initial setup - hide scroll indicator
document.querySelector('.scroll-indicator').style.cssText = `
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
    transition: all 0.5s ease;
`;