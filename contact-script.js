// Contact Page Interactions
function handleSubmit() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields!');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }

    // Simulate form submission
    alert(`Thank you, ${name}! Your message has been sent.\n\nThis is a demo - in production, this would send an actual email.`);
    
    // Reset form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
}

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

    // Parallax effect for decorative elements
    const decoElements = document.querySelectorAll('.deco-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        decoElements.forEach((elem, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            const rotation = scrolled * (0.05 + index * 0.02);
            elem.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });
    });

    // Animate info cards on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const cardsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0) skewY(-2deg)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.info-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px) skewY(-2deg)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        cardsObserver.observe(card);
    });

    // Form input animations
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('label').style.color = '#ffc54a';
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.querySelector('label').style.color = '#00bbfa';
            }
        });
    });

    // Add enter key support for form
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.tagName !== 'TEXTAREA') {
                e.preventDefault();
                handleSubmit();
            }
        });
    });

    console.log('Contact page initialized! 📧');
});
