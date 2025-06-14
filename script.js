// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for section animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(element => {
    observer.observe(element);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message with animation
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thanks for your message! I will get back to you soon.';
        successMessage.style.backgroundColor = 'var(--accent-color)';
        successMessage.style.color = 'var(--dark-bg)';
        successMessage.style.padding = '1rem';
        successMessage.style.borderRadius = '25px';
        successMessage.style.marginTop = '1rem';
        successMessage.style.marginLeft = '-5px';
        successMessage.style.textAlign = 'center';
        contactForm.appendChild(successMessage);
        
        // Remove message after 10 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
        
        contactForm.reset();
    });
}

// Skill cards hover effect
const skillCard = document.querySelectorAll('.skill-card');

skillCard.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const skillInfo = card.querySelector('.skill-info');
        if (skillInfo) {
            skillInfo.style.transform = 'translateY(0)';
        }
        card.style.transform = 'translateY(50px)';
        card.style.boxShadow = '0 10px 20px rgba(183, 0, 255, 0.16)';
    });
    
    card.addEventListener('mouseleave', () => {
        const skillInfo = card.querySelector('.skill-info');
        if (skillInfo) {
            skillInfo.style.transform = 'translateY(100%)';
        }
        card.style.transform = '';
        card.style.boxShadow = '';
    });
});

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const projectInfo = card.querySelector('.project-info');
        if (projectInfo) {
            projectInfo.style.transform = 'translateY(0)';
        }
        card.style.transform = 'translateY(-50px)';
        card.style.boxShadow = '0 10px 20px rgba(183, 0, 255, 0.16)';
    });
    
    card.addEventListener('mouseleave', () => {
        const projectInfo = card.querySelector('.project-info');
        if (projectInfo) {
            projectInfo.style.transform = 'translateY(100%)';
        }
        card.style.transform = '';
        card.style.boxShadow = '';
    });
});

// Add typing effect to hero text
const heroText = document.querySelector('.hero-content h1');
if (heroText) {
    // Store original text content
    const text = heroText.textContent;
    // Set empty text for typing effect
    heroText.textContent = '';
    // Make it visible for the typing effect
    heroText.style.opacity = '1';
    heroText.style.transform = 'translateY(0)';
    
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 1000);
    });
}

// Additional entrance animations
function animateOnScroll() {
    // Query all animation elements by section for sequential animation
    const sections = ['#home', '#about', '#projects', '#contact'];
    
    sections.forEach(sectionId => {
        const section = document.querySelector(sectionId);
        if (!section) return;
        
        // Get all animatable elements in this section
        const elements = section.querySelectorAll('.section-title, .about-text, .skill-card, .project-card, .animate-text, .contact-content, .cta-button');
        
        // Calculate if the section is in view
        const sectionPosition = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        // If section is in view, animate its elements with staggered delays
        if (sectionPosition < screenPosition) {
            elements.forEach((element, index) => {
                // Skip elements that are already animated
                if (element.classList.contains('animated')) return;
                
                // Calculate a staggered delay
                const delay = index * 500; // 500ms between each element
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    // Mark as animated so we don't animate it again
                    element.classList.add('animated');
                }, delay);
            });
        }
    });
    
    // Handle footer separately
    const footer = document.querySelector('footer');
    if (footer) {
        const footerPosition = footer.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (footerPosition < screenPosition && !footer.classList.contains('animated')) {
            footer.style.opacity = '1';
            footer.style.transform = 'translateY(0)';
            footer.classList.add('animated');
        }
    }
}

// Remove existing animation classes from CSS to let JS handle it
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.section-title, .about-text, .skill-card, .project-card, .animate-text, .contact-content, .cta-button, footer');
    
    // Reset initial state for JS animations
    animatedElements.forEach(element => {
        // Skip hero title as it's handled by the typing effect
        if (element.classList.contains('hero-content') || element === document.querySelector('.hero-content h1')) return;
        
        // Only if not already set by the CSS animation
        if (window.getComputedStyle(element).opacity !== '1') {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });

    // Show all elements immediately
    const animateElements = document.querySelectorAll('.section-title, .about-content, .projects-content, .contact-content, .project-grid, .skill-card');
    animateElements.forEach(element => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
    });
});

// Call on initial load
window.addEventListener('load', () => {
    // Immediately trigger the first animation cycle
    animateOnScroll();
    
    // Add a second trigger after a short delay to catch any missed animations
    setTimeout(animateOnScroll, 500);
});

// Call on scroll
window.addEventListener('scroll', animateOnScroll); 

