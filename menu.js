// menu.js - Script pour la navigation

document.addEventListener('DOMContentLoaded', function() {
    const navigation = document.getElementById('navigation');
    
    // Gestion du scroll pour changer l'apparence de la navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Hauteur de la navigation
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu mobile (si nécessaire)
    const createMobileMenu = () => {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        // Créer le bouton hamburger
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Ajouter les styles du hamburger
        const style = document.createElement('style');
        style.textContent = `
            .hamburger {
                display: none;
                flex-direction: column;
                cursor: pointer;
                z-index: 1001;
            }
            
            .hamburger span {
                width: 25px;
                height: 2px;
                background: white;
                margin: 3px 0;
                transition: 0.3s;
            }
            
            .navigation.scrolled .hamburger span {
                background: #8B7355;
            }
            
            @media (max-width: 768px) {
                .hamburger {
                    display: flex;
                }
                
                .nav-menu {
                    position: fixed;
                    top: 0;
                    left: -100%;
                    width: 80%;
                    height: 100vh;
                    background: white;
                    flex-direction: column;
                    padding: 100px 30px;
                    transition: left 0.3s;
                    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
                }
                
                .nav-menu.active {
                    left: 0;
                }
                
                .nav-menu a {
                    color: #333 !important;
                    font-size: 18px;
                    padding: 15px 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Ajouter le hamburger au container
        navContainer.appendChild(hamburger);
        
        // Toggle menu mobile
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Fermer le menu au clic sur un lien
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    };
    
    // Initialiser le menu mobile
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    // Réinitialiser au redimensionnement
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth <= 768 && !document.querySelector('.hamburger')) {
                createMobileMenu();
            }
        }, 250);
    });
});
