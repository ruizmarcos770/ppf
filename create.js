// Autoshield - create.js simplificado
// Script para el sitio web de servicios de protección vehicular

document.addEventListener('DOMContentLoaded', function() {
    console.log("Script iniciado - Versión simplificada");
    
    // Funciones básicas para la navegación
    initNavigation();
    
    // Inicializar año actual en el footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Verificar si estamos en la sección PPF
    if (window.location.hash === '#ppf') {
        console.log("Detectada sección PPF");
    }
});

// Función para inicializar la navegación
function initNavigation() {
    const header = document.querySelector('header.main-header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    // Navegación sticky al hacer scroll
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
    
    // Menú móvil
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) { // Evitar href="#" vacíos
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Cerrar menú móvil si está abierto
                    if (navMenu && navMenu.classList.contains('show')) {
                        navMenu.classList.remove('show');
                        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
                    }
                    
                    // Calcular offset considerando header sticky
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Manejar dropdowns en móvil
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // En móvil, evitar navegación y mostrar/ocultar dropdown
            if (window.innerWidth < 992) {
                e.preventDefault();
                const parent = this.parentNode;
                parent.classList.toggle('show-dropdown');
            }
        });
    });
}
