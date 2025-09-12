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
                    <li class="has-dropdown">
                        <a href="histoire.html">LE CHÂTEAU</a>
                        <ul class="dropdown-menu">
                            <li><a href="histoire.html">Histoire</a></li>
                            <li><a href="parc.html">Le Parc</a></li>
                        </ul>
                    </li>
                    
                    <li class="has-dropdown">
                        <a href="salles.html">NOS ESPACES</a>
                        <ul class="dropdown-menu">
                            <li><a href="sainte-chapelle.html">La Sainte Chapelle</a></li>
                            <li><a href="salle-philippe.html">Salle Philippe Le Bel</a></li>
                            <li><a href="salle-charles.html">Salle Charles VII</a></li>
                        </ul>
                    </li>
                    
                    <li class="has-dropdown">
                        <a href="formule-mariage.html">MARIAGES</a>
                        <ul class="dropdown-menu">
                            <li><a href="formule-mariage.html">Nos Formules</a></li>
                            <li><a href="ceremonie.html">Cérémonie</a></li>
                        </ul>
                    </li>
                    
                    <li class="has-dropdown">
                        <a href="formule-entreprise.html">SÉMINAIRES</a>
                        <ul class="dropdown-menu">
                            <li><a href="formule-entreprise.html">Formules Entreprise</a></li>
                        </ul>
                    </li>
                    
                    <li><a href="partenaires.html">PARTENAIRES</a></li>
                    <li><a href="temoignages.html">TÉMOIGNAGES</a></li>
                    <li><a href="contact.html">CONTACT</a></li>
                </ul>
            </div>
        </nav>
    `;
    
    // Insérer la navigation au début du body
    document.body.insertAdjacentHTML('afterbegin', nav);
    
    // Ajouter les styles CSS pour les dropdowns
    addDropdownStyles();
    
    // Activer le menu mobile
    initMobileMenu();
    
    // Gérer le scroll pour l'effet de navigation
    handleNavigationScroll();
    
    // Marquer la page active
    markActivePage();
    
    // Gérer les dropdowns au survol
    initDropdowns();
}

function addDropdownStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Styles pour les sous-menus dropdown */
        .nav-menu .has-dropdown {
            position: relative;
        }
        
        .nav-menu .dropdown-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background: transparent;
            width: auto;
            padding: 8px 0;
            margin: 0;
            list-style: none;
            z-index: 1000;
        }
        
        /* Quand la nav est scrollée, fond blanc semi-transparent */
        .navigation.scrolled .dropdown-menu {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
        }
        
        .nav-menu .dropdown-menu li {
            display: block;
            width: 100%;
        }
        
        .nav-menu .dropdown-menu li a {
            display: block;
            padding: 10px 20px;
            color: white !important;
            text-decoration: none;
            font-size: 14px;
            font-weight: 300;
            white-space: nowrap;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        /* Texte noir quand la nav est scrollée */
        .navigation.scrolled .dropdown-menu li a {
            color: #333 !important;
        }
        
        .nav-menu .dropdown-menu li a:hover {
            background: rgba(255, 255, 255, 0.1);
            padding-left: 25px;
        }
        
        .navigation.scrolled .dropdown-menu li a:hover {
            background: rgba(139, 115, 85, 0.1);
            color: #8B7355 !important;
        }
        
        /* Afficher le dropdown au survol */
        .nav-menu .has-dropdown:hover .dropdown-menu {
            display: block;
            animation: fadeInDown 0.3s ease;
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Pour mobile, masquer les dropdowns par défaut */
        @media (max-width: 768px) {
            .nav-menu .dropdown-menu {
                position: static;
                box-shadow: none;
                background: transparent;
                padding-left: 20px;
            }
            
            .nav-menu .dropdown-menu li a {
                color: white !important;
                border-bottom: none;
                padding: 10px 15px;
            }
            
            .navigation.scrolled .dropdown-menu li a {
                color: #333 !important;
            }
            
            .nav-menu .has-dropdown.active .dropdown-menu {
                display: block;
            }
            
            .nav-menu .has-dropdown:hover .dropdown-menu {
                display: none;
            }
            
            .nav-menu .has-dropdown.active .dropdown-menu {
                display: block !important;
            }
        }
    `;
    document.head.appendChild(style);
}

function initDropdowns() {
    const dropdowns = document.querySelectorAll('.has-dropdown');
    
    // Pour mobile uniquement - toggle au clic
    dropdowns.forEach(dropdown => {
        const mainLink = dropdown.querySelector('> a');
        
        if (window.innerWidth <= 768) {
            mainLink.addEventListener('click', function(e) {
                // Si on est sur mobile, empêcher la navigation et toggle le dropdown
                if (dropdown.querySelector('.dropdown-menu')) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Fermer les autres dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                }
            });
        }
    });
    
    // Recalculer au resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
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
        
        // Fermer le menu au clic sur un lien (sauf les liens principaux avec dropdown sur mobile)
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            if (!link.parentElement.classList.contains('has-dropdown') || window.innerWidth > 768) {
                link.addEventListener('click', () => {
                    menu.classList.remove('active');
                    toggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            }
        });
    }
}

function handleNavigationScroll() {
    const nav = document.getElementById('navigation');
    if (!nav) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Ajouter la classe scrolled après 100px de scroll
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show sur scroll mobile uniquement
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
    if (window.pageYOffset > 100) {
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
                    <p>Monument Historique</p>
                </div>
                
                <div class="footer-section">
                    <h4>Contact</h4>
                    <p>Gaëtan Delbarre</p>
                    <p>📧 visitechateauduvivier@gmail.com</p>
                    <p>📱 07 86 85 21 37</p>
                </div>
                
                <div class="footer-section">
                    <h4>Localisation</h4>
                    <p>Seine-et-Marne (77)</p>
                    <p>45 km de Paris</p>
                    <p>35 min de Paris Bercy</p>
                </div>
                
                <div class="footer-section">
                    <h4>Suivez-nous</h4>
                    <div class="social-links">
                        <a href="#" aria-label="Facebook">📘</a>
                        <a href="#" aria-label="Instagram">📷</a>
                        <a href="#" aria-label="LinkedIn">💼</a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2024 Château du Vivier - Tous droits réservés | 
                   <a href="mentions-legales.html">Mentions légales</a> | 
                   <a href="cgv.html">CGV</a>
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
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navHeight = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
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
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback pour navigateurs anciens
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
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
    createFooter
};
