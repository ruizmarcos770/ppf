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
