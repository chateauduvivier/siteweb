// menu.js - Navigation et Footer du Château du Vivier

function createNavigation() {
    const nav = `
        <nav class="navigation" id="navigation">
            <div class="nav-wrapper">
                <div class="nav-brand">
                    <svg class="castle-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 13v8h4v-6h2v6h4v-6h2v6h4v-6h2v6h4v-8l-11-9-11 9zm0-2l11-9 11 9v10h-8v-6h-6v6h-8v-10z"/>
                        <path d="M9 3v1.5l3-1.5 3 1.5v-1.5h-6z"/>
                    </svg>
                    <a href="index.html" class="nav-logo">Château du Vivier</a>
                </div>
                
                <ul class="nav-menu" id="navMenu">
                    <li class="has-dropdown">
                        <a href="histoire.html">LE CHÂTEAU</a>
                        <ul class="dropdown-menu">
                            <li><a href="histoire.html">Notre Histoire</a></li>
                            <li><a href="sainte-chapelle.html">La Sainte Chapelle</a></li>
                            <li><a href="salles.html">Nos Espaces</a></li>
                            <li><a href="parc.html">Le Parc</a></li>
                        </ul>
                    </li>
                    
                    <li class="has-dropdown">
                        <a href="formule-mariage.html">MARIAGES</a>
                        <ul class="dropdown-menu">
                            <li><a href="ceremonie.html">Cérémonies</a></li>
                            <li><a href="formule-mariage.html">Formules Mariage</a></li>
                            <li><a href="menu-mariage.html">Menu Gastronomique</a></li>
                        </ul>
                    </li>
                    
                    <li class="has-dropdown">
                        <a href="formule-entreprise.html">ENTREPRISES</a>
                        <ul class="dropdown-menu">
                            <li><a href="formule-entreprise.html">Séminaires</a></li>
                            <li><a href="menu-seminaire.html">Offre Traiteur</a></li>
                        </ul>
                    </li>
                    
                    <li><a href="portfolio.html">GALERIE</a></li>
                    <li><a href="partenaires.html">PARTENAIRES</a></li>
                    <li><a href="contact.html">CONTACT</a></li>
                </ul>
                
                <button class="mobile-menu-toggle" id="mobileMenuToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', nav);
}

function createFooter() {
    const footer = `
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Château du Vivier</h3>
                    <p>Palais Royal depuis 1285</p>
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

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Créer navigation et footer
    createNavigation();
    createFooter();
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Dropdown Mobile
    const dropdowns = document.querySelectorAll('.has-dropdown');
    dropdowns.forEach(dropdown => {
        const mainLink = dropdown.querySelector('> a');
        if (mainLink) {
            mainLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Fermer les autres
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                }
            });
        }
    });
    
    // Scroll Effect
    const navigation = document.getElementById('navigation');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }
    });
    
    // Animation au scroll
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
    
    // Styles pour mobile menu
    const style = document.createElement('style');
    style.innerHTML = `
        body.menu-open {
            overflow: hidden;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);
});
