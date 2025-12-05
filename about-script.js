// About Page Interactions
document.addEventListener('DOMContentLoaded', function() {
    
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
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Animated skill bars
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width = bar.style.width;
                    }, index * 150);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        // Reset skill bars to 0
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const targetWidth = bar.style.width;
            bar.setAttribute('data-width', targetWidth);
            bar.style.width = '0';
        });

        skillsObserver.observe(skillsSection);

        // Animate when visible
        const animateSkills = () => {
            document.querySelectorAll('.skill-progress').forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth;
            });
        };

        skillsObserver.observe(skillsSection);
        
        // Trigger animation
        setTimeout(() => {
            const rect = skillsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animateSkills();
            }
        }, 100);
    }

    // Timeline animation on scroll
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.3
    });

    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `all 0.6s ease ${index * 0.2}s`;
        timelineObserver.observe(item);
    });

    // Parallax effect for decorative shapes
    const shapes = document.querySelectorAll('.deco-shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.15);
            const yPos = -(scrolled * speed);
            const rotation = scrolled * (0.05 + index * 0.03);
            shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });
    });

    console.log('About page initialized! 🎨');
});
