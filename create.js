// script.js completo con gestión mejorada de botones y eventos

document.addEventListener('DOMContentLoaded', function() {
  // Función para detectar si estamos en móvil o desktop
  function isMobile() {
    return window.innerWidth <= 768;
  }
  
  // Elementos del menú
  const navLinks = document.querySelectorAll('.nav-menu a');
  const dropdowns = document.querySelectorAll('.nav-menu .dropdown');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  
  // Menú móvil toggle
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
  
  // Marcar enlaces activos según la sección visible
  function setActiveMenuLink() {
    const scrollPosition = window.scrollY + 100; // Ajuste para header
    
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remover clase activa de todos los enlaces
        navLinks.forEach(link => {
          link.classList.remove('active');
          const parentLi = link.closest('li');
          if (parentLi) {
            parentLi.classList.remove('active');
          }
        });
        
        // Activar enlace correspondiente
        document.querySelectorAll(`a[href="#${sectionId}"]`).forEach(link => {
          link.classList.add('active');
          
          // Si el enlace está en un dropdown, activar también el padre
          const parentDropdown = link.closest('.dropdown');
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
  
  // Dropdown toggle en móvil
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (isMobile()) {
        e.preventDefault();
        e.stopPropagation();
        
        const parent = this.parentElement;
        const dropdownMenu = this.nextElementSibling;
        
        // Cerrar otros dropdowns
        dropdowns.forEach(dropdown => {
          if (dropdown !== parent && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
              menu.classList.remove('show');
            }
          }
        });
        
        // Alternar current dropdown
        parent.classList.toggle('show');
        if (dropdownMenu) {
          dropdownMenu.classList.toggle('show');
        }
      }
    });
  });
  
  // Navegación suave
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Sólo para enlaces internos
      if (href.startsWith('#') && href !== '#') {
        e.preventDefault();
        
        const targetSection = document.querySelector(href);
        if (targetSection) {
          // Cerrar menú móvil si está abierto
          if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileMenuBtn) {
              mobileMenuBtn.classList.remove('active');
            }
          }
          
          // Cerrar dropdowns
          dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
              menu.classList.remove('show');
            }
          });
          
          // Scroll suave a la sección
          const headerOffset = 80; // Ajuste para header
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Marcar enlace como activo
          navLinks.forEach(navLink => {
            navLink.classList.remove('active');
          });
          this.classList.add('active');
        }
      }
    });
  });
  
  
  // Animación de elementos al scroll
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.service-card, .about-content, .about-image, .mission-card, ' +
      '.product-card, .project-item, .testimonial-content, .contact-form, ' +
      '.contact-info, .contact-card'
    );
    
    animatedElements.forEach(element => {
      if (isElementInViewport(element) && !element.classList.contains('animated')) {
        element.classList.add('animated');
      }
    });
  }
  
  // Inicializar animaciones
  window.addEventListener('scroll', setActiveMenuLink);
  window.addEventListener('scroll', handleScrollAnimations);
  window.addEventListener('resize', handleScrollAnimations);
  window.addEventListener('load', function() {
    setActiveMenuLink();
    handleScrollAnimations();
  });
});
 
  // ==========================================
  // 2. HEADER SCROLL EFFECT
  // ==========================================
  const header = document.querySelector('.main-header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Trigger scroll event initially to set correct state
    window.dispatchEvent(new Event('scroll'));
  }
  
  // ==========================================
  // 3. NAVEGACIÓN MÓVIL
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      console.log('Botón de menú móvil activado');
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
      if (!mobileMenuBtn.contains(event.target) && !navMenu.contains(event.target) && navMenu.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }
  
// ==========================================
// 4. DROPDOWN MENUS
// ==========================================
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const dropdowns = document.querySelectorAll('.nav-menu .dropdown');

// Función para detectar si estamos en dispositivo móvil
function isMobile() {
  return window.innerWidth <= 768;
}

// Comportamiento en dispositivos de escritorio - HOVER
if (!isMobile()) {
  dropdowns.forEach(dropdown => {
    // Al pasar el mouse por encima, manejar estado hover manualmente
    dropdown.addEventListener('mouseenter', function() {
      if (!isMobile()) {
        const dropdownMenu = this.querySelector('.dropdown-menu');
        if (dropdownMenu) {
          dropdownMenu.style.opacity = '1';
          dropdownMenu.style.visibility = 'visible';
          dropdownMenu.style.transform = 'translateY(0)';
          dropdownMenu.style.pointerEvents = 'auto';
        }
      }
    });
    
    // Al quitar el mouse, restaurar estado
    dropdown.addEventListener('mouseleave', function() {
      if (!isMobile()) {
        const dropdownMenu = this.querySelector('.dropdown-menu');
        if (dropdownMenu) {
          dropdownMenu.style.opacity = '';
          dropdownMenu.style.visibility = '';
          dropdownMenu.style.transform = '';
          dropdownMenu.style.pointerEvents = '';
        }
      }
    });
  });
}

// Comportamiento en móvil - CLICK
dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', function(e) {
    // Comportamiento en móvil
    if (isMobile()) {
      e.preventDefault();
      this.parentElement.classList.toggle('show');
      const dropdownMenu = this.nextElementSibling;
      if (dropdownMenu) {
        dropdownMenu.classList.toggle('show');
      }
    }
  });
});

// Cerrar los dropdowns al hacer clic en cualquier parte (en móvil)
document.addEventListener('click', function(event) {
  if (isMobile()) {
    const dropdownsShown = document.querySelectorAll('.dropdown.show');
    dropdownsShown.forEach(dropdown => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (dropdownMenu) {
          dropdownMenu.classList.remove('show');
        }
      }
    });
  }
});

// Ajustar al cambiar el tamaño de la ventana
window.addEventListener('resize', function() {
  if (!isMobile()) {
    // En desktop: limpiar cualquier estilo inline añadido en móvil
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.classList.remove('show');
      menu.style.display = '';
    });
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      dropdown.classList.remove('show');
    });
  } else {
    // En móvil: limpiar cualquier estilo inline añadido para hover
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.style.opacity = '';
      menu.style.visibility = '';
      menu.style.transform = '';
      menu.style.pointerEvents = '';
    });
  }
});
  // ==========================================
  // 5. PESTAÑAS DE PRODUCTOS
  // ==========================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const categoryContents = document.querySelectorAll('.category-content');
  
  if (tabBtns.length > 0 && categoryContents.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all tab buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        categoryContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        const category = btn.getAttribute('data-category');
        const targetContent = document.getElementById(`${category}-content`);
        
        if (targetContent) {
          targetContent.classList.add('active');
          console.log(`Pestaña ${category} activada`);
        } else {
          console.warn(`Contenido para categoría ${category} no encontrado`);
        }
      });
    });
  }
  
  // ==========================================
  // 6. FILTRO DE PROYECTOS
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  
  if (filterBtns.length > 0 && projectItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all filter buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        console.log(`Filtro de proyectos: ${filter}`);
        
        // Filter projects
        projectItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.classList.remove('hide');
          } else {
            item.classList.add('hide');
          }
        });
      });
    });
  }
  

  
  
  // ==========================================
// 8. ENLACES DE NAVEGACIÓN SUAVE Y MARCADO DE ACTIVOS
// ==========================================
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
      document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
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
        }
      });
    }
  });
}

// Ejecutar al cargar y al hacer scroll
window.addEventListener('scroll', setActiveMenuLink);
window.addEventListener('load', setActiveMenuLink);

// Navegación suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    if (href !== '#') {
      e.preventDefault();
      
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('active');
          }
        }
        
        const headerOffset = 80; // Ajustar según altura del header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Marcar este enlace como activo
        document.querySelectorAll('.nav-menu a').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
        
        console.log(`Navegación a sección: ${href}`);
      } else {
        console.warn(`Elemento destino no encontrado: ${href}`);
      }
    }
  });
});
  
  // ==========================================
  // 9. FORMULARIO DE CONTACTO
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Si no se está usando Formspree, descomentar esto:
      // e.preventDefault();
      
      // Validación básica de campos
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      // Validación de email
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          isValid = false;
          emailField.classList.add('error');
        }
      }
      
      if (isValid) {
        // Si usas Formspree, esto solo se ejecutará después del envío
        setTimeout(function() {
          const formSuccess = document.getElementById('formSuccess');
          if (formSuccess) {
            formSuccess.style.display = 'block';
            
            // Opcional: resetear el formulario después de 3 segundos
            setTimeout(function() {
              contactForm.reset();
              formSuccess.style.display = 'none';
            }, 3000);
          }
        }, 1000);
        
        console.log('Formulario enviado correctamente');
      } else {
        console.warn('Formulario con errores de validación');
        // Opcionalmente, detener el envío del formulario si hay errores
        // e.preventDefault();
      }
    });
    
    // Limpia los estilos de error al escribir
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', function() {
        this.classList.remove('error');
      });
    });
  }
  
  // ==========================================
  // 10. FORMULARIO DE NEWSLETTER
  // ==========================================
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Siempre prevenir el comportamiento por defecto
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      
      if (emailInput && emailInput.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(emailInput.value)) {
          // Aquí puedes agregar el código para enviar el email a tu servicio de newsletter
          console.log('Suscripción a newsletter:', emailInput.value);
          
          // Mostrar mensaje de éxito (puedes personalizar cómo mostrar este mensaje)
          alert('¡Gracias por suscribirse a nuestro newsletter!');
          
          // Resetear el formulario
          newsletterForm.reset();
        } else {
          alert('Por favor, ingrese un email válido.');
        }
      } else {
        alert('Por favor, ingrese su dirección de email.');
      }
    });
  }
  
  // ==========================================
  // 11. BOTÓN DE WHATSAPP
  // ==========================================
  const whatsappBtn = document.querySelector('.whatsapp-btn');
  
  if (whatsappBtn) {
    // Asegurarse de que el enlace tenga el atributo target="_blank"
    if (!whatsappBtn.getAttribute('target')) {
      whatsappBtn.setAttribute('target', '_blank');
    }
    
    // Opcional: Tracking de clics en el botón de WhatsApp
    whatsappBtn.addEventListener('click', function() {
      console.log('Click en botón de WhatsApp');
      // Aquí puedes agregar código para analytics si lo necesitas
    });
  }
  
  // ==========================================
  // 12. PROJECT LINKS
  // ==========================================
  const projectLinks = document.querySelectorAll('.project-link');
  
  projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const projectTitle = this.closest('.project-overlay').querySelector('h3').textContent;
      console.log(`Click en proyecto: ${projectTitle}`);
      
      // Si el enlace no tiene href o es #, prevenir comportamiento por defecto
      if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
        e.preventDefault();
        // Opcionalmente, mostrar un modal o más información del proyecto
        alert(`Detalles completos del proyecto "${projectTitle}" estarán disponibles próximamente.`);
      }
    });
  });
  
  // ==========================================
  // 13. ACTUALIZAR AÑO EN FOOTER
  // ==========================================
  const currentYearElements = document.querySelectorAll('#currentYear');
  const currentYear = new Date().getFullYear();
  
  currentYearElements.forEach(element => {
    element.textContent = currentYear;
  });
  
  // ==========================================
  // 14. ANIMACIONES AL HACER SCROLL
  // ==========================================
  // Esta funcionalidad es opcional, pero añade un efecto agradable
  // a los elementos cuando aparecen en el viewport
  
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.service-card, .about-content, .about-image, .mission-card, ' +
      '.product-card, .project-item, .testimonial-content, .contact-form, ' +
      '.contact-info, .contact-card'
    );
    
    animatedElements.forEach(element => {
      if (isElementInViewport(element) && !element.classList.contains('animated')) {
        element.classList.add('animated');
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Inicializar las animaciones
  window.addEventListener('scroll', handleScrollAnimations);
  window.addEventListener('resize', handleScrollAnimations);
  window.addEventListener('load', handleScrollAnimations);
  
  // Trigger initial animations
  setTimeout(handleScrollAnimations, 100);
  
  // ==========================================
  // 15. INICIALIZACIÓN COMPLETA
  // ==========================================
  console.log('Inicialización completa del sitio Autoshield');
});

// Función global para manejar posibles errores de carga
window.addEventListener('error', function(e) {
  console.error('Error global:', e.message);
  // Aquí puedes añadir código para manejar errores críticos
  return false;
});
