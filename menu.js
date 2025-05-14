// Correcciones para el menú de navegación

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // 1. ARREGLO PARA MENÚS DESPLEGABLES AL HOVER
  // ==========================================
  
  // Función para detectar si estamos en dispositivo móvil
  function isMobile() {
    return window.innerWidth <= 768;
  }
  
  // Obtener todos los elementos del menú
  const navLinks = document.querySelectorAll('.nav-menu a');
  const dropdowns = document.querySelectorAll('.nav-menu .dropdown');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  // Marcar enlaces activos según la sección actual
  function setActiveMenuLink() {
    // Obtener la posición de scroll actual
    const scrollPosition = window.scrollY;
    
    // Revisar todas las secciones y marcar el enlace correspondiente
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop - 100; // Ajuste para considerar el header
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remover clase activa de todos los enlaces
        navLinks.forEach(link => {
          link.classList.remove('active');
          // Buscar también si el enlace está en un padre dropdown
          const parentLi = link.closest('li');
          if (parentLi) {
            parentLi.classList.remove('active');
          }
        });
        
        // Agregar clase activa al enlace correspondiente
        const activeLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);
        activeLinks.forEach(activeLink => {
          activeLink.classList.add('active');
          
          // Si el enlace activo está en un dropdown, marcar también el padre
          const parentDropdown = activeLink.closest('.dropdown');
          if (parentDropdown) {
            const parentToggle = parentDropdown.querySelector('.dropdown-toggle');
            if (parentToggle) {
              parentToggle.classList.add('active');
            }
            parentDropdown.classList.add('active');
          }
        });
      }
    });
  }
  
  // Ejecutar al cargar y al hacer scroll
  window.addEventListener('scroll', setActiveMenuLink);
  window.addEventListener('load', setActiveMenuLink);
  
  // Comportamiento en dispositivos de escritorio
  if (!isMobile()) {
    dropdowns.forEach(dropdown => {
      // Al pasar el mouse por encima, abrir dropdown
      dropdown.addEventListener('mouseenter', function() {
        if (!isMobile()) { // Verificar nuevamente en caso de resize
          const dropdownMenu = this.querySelector('.dropdown-menu');
          if (dropdownMenu) {
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateY(0)';
          }
        }
      });
      
      // Al quitar el mouse, cerrar dropdown
      dropdown.addEventListener('mouseleave', function() {
        if (!isMobile()) {
          const dropdownMenu = this.querySelector('.dropdown-menu');
          if (dropdownMenu) {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
            dropdownMenu.style.transform = 'translateY(10px)';
          }
        }
      });
    });
  }
  
  // Comportamiento en dispositivos móviles
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (isMobile()) {
        e.preventDefault();
        e.stopPropagation();
        
        const parent = this.parentElement;
        const dropdownMenu = this.nextElementSibling;
        
        // Cerrar todos los otros dropdowns
        dropdowns.forEach(dropdown => {
          if (dropdown !== parent && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
              menu.classList.remove('show');
            }
          }
        });
        
        // Alternar el estado del dropdown actual
        parent.classList.toggle('show');
        if (dropdownMenu) {
          dropdownMenu.classList.toggle('show');
        }
      }
    });
  });
  
  // ==========================================
  // 2. NAVEGACIÓN SUAVE A SECCIONES
  // ==========================================
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Si es un enlace a una sección de la misma página
      if (href.startsWith('#') && href !== '#') {
        e.preventDefault();
        
        const targetSection = document.querySelector(href);
        
        if (targetSection) {
          // Cerrar menú móvil si está abierto
          const navMenu = document.getElementById('navMenu');
          const mobileMenuBtn = document.getElementById('mobileMenuBtn');
          
          if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileMenuBtn) {
              mobileMenuBtn.classList.remove('active');
            }
          }
          
          // Cerrar dropdowns abiertos
          dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
              menu.classList.remove('show');
            }
          });
          
          // Scroll suave a la sección
          const headerOffset = 80; // Ajustar según altura del header
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Marcar este enlace como activo
          navLinks.forEach(navLink => {
            navLink.classList.remove('active');
          });
          
          this.classList.add('active');
          
          console.log(`Navegación a sección: ${href}`);
        }
      }
    });
  });
  
  // ==========================================
  // 3. AJUSTES AL CAMBIAR TAMAÑO DE VENTANA
  // ==========================================
  window.addEventListener('resize', function() {
    // Si cambiamos de móvil a desktop o viceversa
    dropdowns.forEach(dropdown => {
      // Resetear estados
      if (!isMobile()) {
        dropdown.classList.remove('show');
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
          menu.classList.remove('show');
          menu.style.opacity = '';
          menu.style.visibility = '';
          menu.style.transform = '';
        }
      }
    });
  });
  
  console.log('Inicialización de navegación mejorada completada');
});
