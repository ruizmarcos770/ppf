// script.js completo con gestión mejorada de botones y eventos

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // 1. INICIALIZACIÓN DEL CARRUSEL BOOTSTRAP
  // ==========================================
  try {
    const heroCarouselElement = document.getElementById('heroCarousel');
    if (heroCarouselElement) {
      const heroCarousel = new bootstrap.Carousel(heroCarouselElement, {
        interval: 5000,  // Cambio cada 5 segundos
        keyboard: true,  // Permitir control con teclado
        pause: 'hover',  // Pausar al posicionar el cursor
        wrap: true       // Vuelta continua al final
      });
      
      console.log('Carousel inicializado correctamente');
    } else {
      console.warn('Elemento carousel no encontrado en el DOM');
    }
  } catch (error) {
    console.error('Error al inicializar el carousel:', error);
  }
  
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
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      // Comportamiento en móvil
      if (window.innerWidth <= 768) {
        e.preventDefault();
        this.parentElement.classList.toggle('show');
        const dropdownMenu = this.nextElementSibling;
        if (dropdownMenu) {
          dropdownMenu.classList.toggle('show');
        }
      }
    });
  });
  
  // Cerrar los dropdowns al hacer clic en cualquier parte
  document.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.dropdown.show');
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (dropdownMenu) {
          dropdownMenu.classList.remove('show');
        }
      }
    });
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
  // 7. SLIDER DE TESTIMONIOS
  // ==========================================
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
  const testimonialPrev = document.querySelector('.testimonial-nav.prev');
  const testimonialNext = document.querySelector('.testimonial-nav.next');
  
  if (testimonialSlides.length > 0) {
    let currentSlide = 0;
    let testimonialInterval;
    
    // Function to show a specific slide
    function showSlide(index) {
      // Hide all slides
      testimonialSlides.forEach(slide => slide.classList.remove('active'));
      testimonialDots.forEach(dot => dot.classList.remove('active'));
      
      // Show the current slide
      testimonialSlides[index].classList.add('active');
      if (testimonialDots[index]) {
        testimonialDots[index].classList.add('active');
      }
      
      currentSlide = index;
    }
    
    // Initialize with first slide
    showSlide(0);
    
    // Next slide
    if (testimonialNext) {
      testimonialNext.addEventListener('click', function() {
        clearInterval(testimonialInterval); // Reset autoplay timer on manual navigation
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
        startAutoSlide(); // Restart autoplay
      });
    }
    
    // Previous slide
    if (testimonialPrev) {
      testimonialPrev.addEventListener('click', function() {
        clearInterval(testimonialInterval); // Reset autoplay timer on manual navigation
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
        startAutoSlide(); // Restart autoplay
      });
    }
    
    // Testimonial dot navigation
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        clearInterval(testimonialInterval); // Reset autoplay timer on manual navigation
        showSlide(index);
        startAutoSlide(); // Restart autoplay
      });
    });
    
    // Auto advance testimonials
    function startAutoSlide() {
      testimonialInterval = setInterval(function() {
        if (document.visibilityState === 'visible') {
          currentSlide = (currentSlide + 1) % testimonialSlides.length;
          showSlide(currentSlide);
        }
      }, 8000);
    }
    
    startAutoSlide(); // Start autoplay on page load
    
    // Pause autoplay when hovering over testimonials
    const testimonialContainer = document.querySelector('.testimonials-slider');
    if (testimonialContainer) {
      testimonialContainer.addEventListener('mouseenter', function() {
        clearInterval(testimonialInterval);
      });
      
      testimonialContainer.addEventListener('mouseleave', function() {
        startAutoSlide();
      });
    }
  }
  
  // ==========================================
  // 8. ENLACES DE NAVEGACIÓN SUAVE
  // ==========================================
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
