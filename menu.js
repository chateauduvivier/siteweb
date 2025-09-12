// menu.js - Navigation principale du Château du Vivier

function createNavigation() {
    const nav = `
        <nav class="navigation" id="navigation">
            <div class="nav-container">
                <div class="nav-brand">
                    <!-- Castle Icon SVG -->
                    <svg class="castle-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 13v8h4v-6h2v6h4v-6h2v6h4v-6h2v6h4v-8l-11-9-11 9zm0-2l11-9 11 9v10h-8v-6h-6v6h-8v-10z"/>
                        <path d="M9 3v1.5l3-1.5 3 1.5v-1.5h-6z"/>
                    </svg>
                    <a href="index.html" class="nav-logo">Château du Vivier</a>
                </div>
                
                <!-- Menu Mobile Toggle -->
                <button class="mobile-menu-toggle" id="mobileMenuToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                
                <ul class="nav-menu" id="navMenu">
                    <li><a href="index.html">ACCUEIL</a></li>
                    
                    <li class="has-dropdown">
                        <a href="#" class="dropdown-toggle">DÉCOUVRIR</a>
                        <div class="dropdown">
                            <a href="histoire.html">Histoire du Château</a>
                            <a href="architecture.html">Architecture Renaissance</a>
                            <a href="jardins.html">Les Jardins à la Française</a>
                            <a href="restauration.html">Projet de Restauration</a>
                        </div>
                    </li>
                    
                    <li class="has-dropdown">
                        <a href="#" class="dropdown-toggle">ESPACES</a>
                        <div class="dropdown">
                            <a href="sainte-chapelle.html">La Sainte Chapelle</a>
                            <a href="grande-galerie.html">La Grande Galerie</a>
                            <a href="salle-royale.html">La Salle Royale</a>
                            <a href="salon-bleu.html">Le Salon Bleu</a>
                            <a href="salle-armes.html">La Salle d'Armes</a>
                            <a href="orangerie.html">L'Orangerie</a>
                            <a href="parc.html">Le Parc de 25 hectares</a>
                        </div>
                    </li>
                    
                    <li class="has-dropdown">
                        <a href="mariages.html">MARIAGES</a>
                        <div class="dropdown">
                            <a href="ceremonie-laique.html">Cérémonie Laïque</a>
                            <a href="reception-mariage.html">Réception & Dîner</a>
                            <a href="hebergement.html">Hébergement sur place</a>
                            <a href="forfaits-mariage.html">Nos Forfaits</a>
                            <a href="galerie-mariages.html">Galerie Mariages</a>
                        </div>
                    </li>
                    
                    <li class="has-dropdown">
                        <a href="seminaires.html">SÉMINAIRES</a>
                        <div class="dropdown">
                            <a href="salles-reunion.html">Salles de Réunion</a>
                            <a href="team-building.html">Team Building</a>
                            <a href="soirees-gala.html">Soirées de Gala</a>
                            <a href="forfaits-entreprise.html">Forfaits Entreprise</a>
                            <a href="services-pro.html">Services Pro</a>
                        </div>
                    </li>
                    
                    <li><a href="contact.html">CONTACT</a></li>
                    <li><a href="#" class="nav-lang">FR</a></li>
                </ul>
            </div>
        </nav>
    `;
    
    // Insérer la navigation au début du body
    document.body.insertAdjacentHTML('afterbegin', nav);
    
    // Activer le menu mobile
    initMobileMenu();
    
    // Gérer le scroll pour l'effet de navigation
    handleNavigationScroll();
    
    // Marquer la page active
    markActivePage();
    
    // Gérer les dropdowns au survol
    initDropdowns();
}

function initDropdowns() {
    const dropdowns = document.querySelectorAll('.has-dropdown');
    
    dropdowns.forEach(dropdown => {
        let timeoutId;
        
        // Afficher au survol
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(timeoutId);
            this.classList.add('active');
        });
        
        // Masquer après un délai
        dropdown.addEventListener('mouseleave', function() {
            timeoutId = setTimeout(() => {
                this.classList.remove('active');
            }, 200);
        });
        
        // Pour mobile - toggle au clic
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
}

function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('navMenu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Fermer le menu au clic sur un lien (sauf dropdowns)
        const menuLinks = menu.querySelectorAll('a:not(.dropdown-toggle)');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Fermer au clic en dehors
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

function handleNavigationScroll() {
    const nav = document.getElementById('navigation');
    let lastScroll = 0;
    
    // Déterminer si on est sur la page d'accueil ou une page avec hero
    const heroSection = document.querySelector('.hero-section');
    const heroHeight = heroSection ? heroSection.offsetHeight : 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Ajouter la classe scrolled quand on dépasse la section hero
        if (currentScroll > (heroHeight * 0.8)) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show sur scroll mobile
        if (window.innerWidth < 768) {
            if (currentScroll > lastScroll && currentScroll > 200) {
                nav.classList.add('hidden');
            } else {
                nav.classList.remove('hidden');
            }
        }
        
        lastScroll = currentScroll;
    });
    
    // Check initial state
    if (window.pageYOffset > (heroHeight * 0.8)) {
        nav.classList.add('scrolled');
    }
}

function markActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
            // Marquer aussi le parent si c'est un sous-menu
            const parentLi = link.closest('.has-dropdown');
            if (parentLi) {
                parentLi.querySelector('> a').classList.add('active-parent');
            }
        }
    });
}

// Créer le footer commun
function createFooter() {
    const footer = `
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h3 class="footer-title">Château du Vivier</h3>
                    <p>Palais Royal depuis Philippe IV Le Bel</p>
                    <p>Monument Historique Classé</p>
                    <div class="footer-logo">
                        <svg class="castle-icon-footer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 13v8h4v-6h2v6h4v-6h2v6h4v-6h2v6h4v-8l-11-9-11 9zm0-2l11-9 11 9v10h-8v-6h-6v6h-8v-10z"/>
                            <path d="M9 3v1.5l3-1.5 3 1.5v-1.5h-6z"/>
                        </svg>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h4>Contact</h4>
                    <p>Gaëtan Delbarre</p>
                    <p>📧 contact@chateauduvivier.fr</p>
                    <p>📱 07 86 85 21 37</p>
                    <p>📍 Fontenay-Trésigny, 77610</p>
                </div>
                
                <div class="footer-section">
                    <h4>Accès</h4>
                    <p>Seine-et-Marne (77)</p>
                    <p>45 km de Paris</p>
                    <p>35 min de Paris Bercy</p>
                    <p>Gare SNCF: Marles-en-Brie</p>
                </div>
                
                <div class="footer-section">
                    <h4>Suivez-nous</h4>
                    <div class="social-links">
                        <a href="#" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="#" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                            </svg>
                        </a>
                        <a href="#" aria-label="LinkedIn">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2024 Château du Vivier - Tous droits réservés | 
                   <a href="mentions-legales.html">Mentions légales</a> | 
                   <a href="cgv.html">CGV</a> | 
                   <a href="politique-confidentialite.html">Politique de confidentialité</a>
                </p>
            </div>
        </footer>
    `;
    
    document.body.insertAdjacentHTML('beforeend', footer);
}

// Fonction d'initialisation du menu et du footer
function initializeLayout() {
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            createNavigation();
            createFooter();
            initSmoothScroll();
            initLazyLoading();
            initScrollAnimations();
        });
    } else {
        createNavigation();
        createFooter();
        initSmoothScroll();
        initLazyLoading();
        initScrollAnimations();
    }
}

// Smooth scroll pour les ancres
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Lazy loading des images pour performance
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback pour navigateurs anciens
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Observer pour animations au scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionnel: arrêter d'observer après l'animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}

// Initialiser toutes les fonctionnalités
initializeLayout();

// Exports pour utilisation dans d'autres scripts si nécessaire
window.ChateauVivier = {
    initSmoothScroll,
    initLazyLoading,
    initScrollAnimations,
    createNavigation,
    createFooter,
    initDropdowns
};
