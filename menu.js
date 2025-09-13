// menu.js - Navigation principale du Château du Vivier

function createNavigation() {
    const nav = `
        <nav class="main-nav" id="mainNav">
            <div class="nav-container">
                <div class="nav-brand">
                    <a href="index.html" class="brand-link">
                        <svg class="castle-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 13v8h4v-6h2v6h4v-6h2v6h4v-6h2v6h4v-8l-11-9-11 9zm0-2l11-9 11 9v10h-8v-6h-6v6h-8v-10z"/>
                            <path d="M9 3v1.5l3-1.5 3 1.5v-1.5h-6z"/>
                        </svg>
                        <span class="brand-text">Château du Vivier</span>
                    </a>
                </div>
                
                <ul class="nav-menu" id="navMenu">
                    <li class="nav-item has-dropdown">
                        <a href="#" class="nav-link">Le Château</a>
                        <ul class="dropdown">
                            <li><a href="histoire.html">Histoire du Château</a></li>
                            <li><a href="sainte-chapelle.html">La Sainte Chapelle</a></li>
                            <li><a href="salles.html">Nos Espaces</a></li>
                            <li><a href="parc.html">Le Parc</a></li>
                        </ul>
                    </li>
                    <li class="nav-item has-dropdown">
                        <a href="mariages.html" class="nav-link">Mariages</a>
                        <ul class="dropdown">
                            <li><a href="mariages.html#ceremonies">Cérémonies</a></li>
                            <li><a href="mariages.html#formule">Package Clé en Main</a></li>
                            <li><a href="mariages.html#menu">Notre Menu</a></li>
                        </ul>
                    </li>
                    <li class="nav-item has-dropdown">
                        <a href="entreprises.html" class="nav-link">Entreprises</a>
                        <ul class="dropdown">
                            <li><a href="entreprises.html#salles">Nos Salles</a></li>
                            <li><a href="entreprises.html#teambuilding">Team Building</a></li>
                            <li><a href="entreprises.html#restauration">Restauration</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="galerie.html" class="nav-link">Galerie</a>
                    </li>
                    <li class="nav-item">
                        <a href="partenaires.html" class="nav-link">Partenaires</a>
                    </li>
                    <li class="nav-item">
                        <a href="contact.html" class="nav-link">Contact</a>
                    </li>
                </ul>
                
                <button class="mobile-toggle" id="mobileToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', nav);
    
    initMobileMenu();
    handleNavScroll();
    initDropdowns();
    markActivePage();
}

function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('navMenu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        const links = menu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

function handleNavScroll() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        if (window.innerWidth < 768) {
            if (currentScroll > lastScroll && currentScroll > 300) {
                nav.classList.add('hidden');
            } else {
                nav.classList.remove('hidden');
            }
        }
        
        lastScroll = currentScroll;
    });
}

function initDropdowns() {
    const dropdowns = document.querySelectorAll('.has-dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown');
        
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', () => {
                menu.style.display = 'block';
                setTimeout(() => {
                    menu.classList.add('show');
                }, 10);
            });
            
            dropdown.addEventListener('mouseleave', () => {
                menu.classList.remove('show');
                setTimeout(() => {
                    menu.style.display = 'none';
                }, 300);
            });
        }
        
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && menu) {
                e.preventDefault();
                const isOpen = menu.style.display === 'block';
                
                document.querySelectorAll('.dropdown').forEach(dd => {
                    dd.style.display = 'none';
                    dd.classList.remove('show');
                });
                
                if (!isOpen) {
                    menu.style.display = 'block';
                    setTimeout(() => {
                        menu.classList.add('show');
                    }, 10);
                }
            }
        });
    });
}

function markActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .dropdown a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

function createFooter() {
    const footer = `
        <footer class="main-footer">
            <div class="footer-container">
                <div class="footer-grid">
                    <div class="footer-col">
                        <h3>Château du Vivier</h3>
                        <p class="subtitle">Un Château... Votre réception... Notre passion</p>
                        <p>Palais Royal depuis Philippe IV Le Bel</p>
                        <p>Monument Historique</p>
                    </div>
                    
                    <div class="footer-col">
                        <h4>Contact</h4>
                        <p>77610 Fontenay-Trésigny</p>
                        <p>Seine-et-Marne, France</p>
                        <p>📞 07 86 85 21 37</p>
                        <p>📧 visitechateauduvivier@gmail.com</p>
                    </div>
                    
                    <div class="footer-col">
                        <h4>Accès</h4>
                        <p>45 km de Paris</p>
                        <p>35 min de Paris Bercy</p>
                        <p>A4 sortie 13 Gretz-Tournan</p>
                        <p>Parking 80 places</p>
                    </div>
                    
                    <div class="footer-col">
                        <h4>Suivez-nous</h4>
                        <div class="social-links">
                            <a href="#" aria-label="Facebook">
                                <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                            <a href="#" aria-label="Instagram">
                                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; 2024 Château du Vivier - Tous droits réservés | 
                       <a href="mentions.html">Mentions légales</a> | 
                       <a href="cgv.html">CGV</a>
                    </p>
                </div>
            </div>
        </footer>
    `;
    
    document.body.insertAdjacentHTML('beforeend', footer);
}

function initSmoothScroll() {
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
}

function initializeLayout() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            createNavigation();
            createFooter();
            initSmoothScroll();
        });
    } else {
        createNavigation();
        createFooter();
        initSmoothScroll();
    }
}

initializeLayout();
