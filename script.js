// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.product-card, .why-item, .testimonial, .feature, .gallery-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Contact form validation and submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (name && phone && email && message) {
        if (isValidEmail(email) && isValidPhone(phone)) {
            // Simulate form submission
            showSuccessMessage();
            contactForm.reset();
        } else {
            showError('Please enter valid email and phone number.');
        }
    } else {
        showError('Please fill in all fields.');
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showSuccessMessage() {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Thank you! Message sent successfully! 🎉';
    submitBtn.style.background = 'linear-gradient(45deg, var(--green), #00FF7F)';
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
    }, 3000);
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: #ff4757;
        color: white;
        padding: 10px 20px;
        border-radius: 10px;
        margin-bottom: 1rem;
        text-align: center;
    `;
    errorDiv.textContent = message;
    
    const form = document.querySelector('.contact-form');
    form.insertBefore(errorDiv, form.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 4000);
}

// Powder splash canvas animation
function initPowderCanvas() {
    const canvas = document.getElementById('powderCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#FF69B4', '#FFD700', '#32CD32', '#4169E1', '#FF1493', '#FFA500'];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 50;
            this.size = Math.random() * 5 + 2;
            this.speedY = Math.random() * -3 - 1;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.5 + 0.2;
            this.gravity = 0.05;
        }
        
        update() {
            this.speedY += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.y > canvas.height) {
                this.y = canvas.height + 50;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Create initial particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            
            // Respawn particles
            if (particle.y > canvas.height) {
                particles[index] = new Particle();
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Product buttons functionality
document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const productName = this.parentElement.querySelector('h3').textContent;
        const message = `Hi! I'm interested in ordering ${productName} from Ankur Enterprises. Please share more details and pricing.`;
        window.open(`https://wa.me/917249028344?text=${encodeURIComponent(message)}`, '_blank');
    });
});

// Gallery lightbox effect (simple hover)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        alert('Gallery image clicked! (Full lightbox implementation can be added)');
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPowderCanvas();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Preload images for better performance (if you add real images)
    const images = [
        // Add your image paths here
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can be added here
}, 16));
