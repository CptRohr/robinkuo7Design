// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items with animation
            portfolioItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    // Show item with staggered animation
                    setTimeout(() => {
                        item.style.display = 'block';
                        item.style.animation = 'none';
                        setTimeout(() => {
                            item.style.animation = 'fadeInUp 0.6s ease-out';
                        }, 10);
                    }, index * 100);
                } else {
                    // Hide item
                    item.style.animation = 'fadeOut 0.3s ease-out';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // View project button functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectTitle = this.closest('.portfolio-item').querySelector('h3').textContent;
            alert(`Opening: ${projectTitle}\n\nThis is where you'd link to the project detail page!`);
            // Replace alert with actual navigation when you have detail pages
            // window.location.href = 'project-detail.html?id=' + projectId;
        });
    });

    // Add click event to entire portfolio item
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const viewBtn = this.querySelector('.view-btn');
            if (viewBtn) {
                viewBtn.click();
            }
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Add parallax effect to decorative boxes
    const decoBoxes = document.querySelectorAll('.deco-box');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        decoBoxes.forEach((box, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            box.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Stats counter animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateCounter(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const targetNumber = parseInt(text.replace(/\D/g, ''));
        
        let currentNumber = 0;
        const increment = targetNumber / 50; // 50 steps
        const duration = 2000; // 2 seconds
        const stepTime = duration / 50;

        const counter = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(counter);
            }
            
            let displayText = Math.floor(currentNumber).toString();
            if (hasPlus) displayText += '+';
            if (hasPercent) displayText += '%';
            
            element.textContent = displayText;
        }, stepTime);
    }

    // Add hover sound effect (optional - commented out by default)
    /*
    const buttons = document.querySelectorAll('.filter-btn, .view-btn, .nav-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Add your sound effect here
            // const audio = new Audio('sounds/hover.mp3');
            // audio.play();
        });
    });
    */

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals or overlays
            const overlays = document.querySelectorAll('.item-overlay');
            overlays.forEach(overlay => {
                overlay.style.opacity = '0';
            });
        }
    });

    // Add CSS animation for fadeOut
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(30px);
            }
        }
    `;
    document.head.appendChild(style);

    console.log('Portfolio initialized - Persona style activated! 🎮');
});
