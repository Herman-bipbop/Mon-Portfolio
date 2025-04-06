// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Initialisez EmailJS avec votre clé publique
(function() {
    // Remplacez "your_public_key" par votre clé publique EmailJS
    emailjs.init("HSmULLodLxGG3gkEJ");
})();

// Gestionnaire d'événement de soumission de formulaire avec EmailJS
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Désactiver le bouton de soumission et afficher un indicateur de chargement
    const submitButton = document.querySelector('.form-button');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Envoi en cours...";
    
    // Simple form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (name && email && subject && message) {
        // Préparer les paramètres à envoyer
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };
        
        //  IDs EmailJS
        emailjs.send('service_ydjkzeg', 'template_mybeojo', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showNotification("Message envoyé avec succès!", "success");
                contactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                showNotification("Échec de l'envoi. Veuillez réessayer.", "error");
            })
            .finally(() => {
                // Réactiver le bouton
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
    } else {
        // Afficher une notification d'erreur si les champs ne sont pas remplis
        showNotification("Veuillez remplir tous les champs du formulaire.", "error");
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// Fonction pour afficher des notifications
function showNotification(message, type) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Ajouter la notification au DOM
    document.body.appendChild(notification);
    
    // Animer l'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Mobile menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const backdrop = document.querySelector('.backdrop');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    backdrop.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
mobileMenuClose.addEventListener('click', toggleMobileMenu);
backdrop.addEventListener('click', toggleMobileMenu);

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
});

// Animation on scroll
const animateElements = document.querySelectorAll('.animate-fadeInUp');

function checkInView() {
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initial check
window.addEventListener('load', checkInView);
// Check on scroll
window.addEventListener('scroll', checkInView);

// l'arrière-plan du héros
function createParticles() {
    const container = document.createElement('div');
    container.className = 'particles-container';
    
    // Insérer avant le contenu du héros
    const heroSection = document.querySelector('.hero');
    heroSection.insertBefore(container, heroSection.firstChild);
    
    // Créer des particules
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position aléatoire
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Taille aléatoire
        const size = Math.random() * 30 + 10;
        
        // Couleur aléatoire (nuances de bleu/violet)
        const hue = Math.random() * 40 + 230; // 230-270 (bleu à violet)
        
        // Appliquer les styles
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = `hsla(${hue}, 80%, 60%, 0.2)`;
        
        // Animation delay aléatoire
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
        
        container.appendChild(particle);
    }
}

// 2. Effet de typing pour le sous-titre
function setupTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.classList.add('typing-effect');
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < originalText.length) {
            subtitle.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            setTimeout(() => {
                subtitle.classList.remove('typing-effect');
            }, 2000);
        }
    }, 100);
}

// 3. Curseur personnalisé
function setupCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Déplacer le curseur
    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    // Agrandir le curseur sur les éléments cliquables
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .social-link, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}

// 4. Bouton retour en haut
function setupBackToTop() {
    const button = document.createElement('div');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 5. Basculement du thème sombre/clair
function setupThemeToggle() {
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '☀️';
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('light-theme');
        themeToggle.innerHTML = document.documentElement.classList.contains('light-theme') ? '🌙' : '☀️';
    });
}

// 6. Animation d'entrée avancée
function setupScrollReveal() {
    const elements = document.querySelectorAll('.animate-fadeInUp');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

// 7. Animation d'entrée pour les compétences
function animateSkills() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.style.opacity = '0';
    });
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            skillTags.forEach(tag => {
                tag.style.opacity = '1';
            });
            observer.disconnect();
        }
    });
    
    observer.observe(document.querySelector('.skills'));
}

// Initialiser tous les effets au chargement de la page
window.addEventListener('load', () => {
    createParticles();
    setupTypingEffect();
    setupCustomCursor();
    setupBackToTop();
    setupThemeToggle();
    setupScrollReveal();
    animateSkills();
});