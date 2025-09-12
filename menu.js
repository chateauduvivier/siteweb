// menu.js - Navigation principale du Château du Vivier

function createNavigation() {
    const nav = `
        <nav class="navigation" id="navigation">
            <div class="nav-wrapper">
                <!-- Logo seul sur la première ligne -->
                <div class="nav-top-line">
                    <div class="nav-brand">
                        <svg class="castle-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 13v8h4v-6h2v6h4v-6h2v6h4v-6h2v6h4v-8l-11-9-11 9zm0-2l11-9 11 9v10h-8v-6h-6v6h-8v-10z"/>
                            <path d="M9 3v1.5l3-1.5 3 1.5v-1.5h-6z"/>
                        </svg>
                        <a href="index.html" class="nav-logo">Château du Vivier</a>
                    </div>
                </div>
                
                <!-- Menu sur la deuxième ligne -->
                <div class="nav-bottom-line">
                    <ul class="nav-menu" id="navMenu">
                        <li class="has-dropdown">
                            <a href="histoire.html">LE CHÂTEAU</a>
                            <ul class="dropdown-menu">
                                <li><a href="histoire.html">L'Histoire du Château</a></li>
                                <li><a href="sainte-chapelle.html">La Sainte Chapelle</a></li>
                                <li><a href="salles.html">Nos Espaces</a></li>
                            </ul>
                        </li>
                        
                        <li class="has-dropdown">
                            <a href="formule-mariage.html">MARIAGES</a>
                            <ul class="dropdown-menu">
                                <li><a href="ceremonie.html">Cérémonies</a></li>
                                <li><a href="formule-mariage.html">Package Clé en Main</a></li>
                                <li><a href="menu-mariage.html">Notre Menu</a></li>
                            </ul>
                        </li>
                        
                        <li class="has-dropdown">
                            <a href="formule-entreprise.html">SÉMINAIRES</a>
                            <ul class="dropdown-menu">
                                <li><a href="formule-entreprise.html">Formules Entreprise</a></li>
                                <li><a href="menu-seminaire.html">Notre Menu</a></li>
                            </ul>
                        </li>
                        
                        <li><a href="portfolio.html">PORTFOLIO</a></li>
                        <li><a href="partenaires.html">PARTENAIRES</a></li>
                        <li><a href="temoignages.html">TÉMOIGNAGES</a></li>
                        <li><a href="contact.html">CONTACT</a></li>
                    </ul>
                </div>
                
                <!-- Menu Mobile Toggle -->
                <button class="mobile-menu-toggle" id="mobileMenuToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
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
        
        // Afficher au survol sur desktop
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                clearTimeout(timeoutId);
                this.classList.add('active');
            }
        });
        
        // Masquer après un délai sur desktop
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                timeoutId = setTimeout(() => {
                    this.classList.remove('active');
                }, 200);
            }
        });
        
        // Pour mobile - toggle au clic
        const mainLink = dropdown.querySelector('> a');
        if (mainLink && window.innerWidth <= 768) {
            mainLink.addEventListener('click', function(e) {
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
        
        // Fermer le menu au clic sur un lien
        const menuLinks = menu.querySelectorAll('a:not(.has-dropdown > a)');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

function handleNavigationScroll() {
    const nav = document.getElementById('navigation');
    if (!nav) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Ajouter la classe scrolled après 50px de scroll
        if (currentScroll > 50) {
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
}

function markActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
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

// Fonction d'initialisation
function initializeLayout() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            createNavigation();
            createFooter();
        });
    } else {
        createNavigation();
        createFooter();
    }
}

// Initialiser
initializeLayout();

// Exports
window.ChateauVivier = {
    createNavigation,
    createFooter,
    initDropdowns,
    markActivePage
};
