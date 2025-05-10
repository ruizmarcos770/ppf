/**
 * AUTOSHIELD - Script principal
 * Funcionalidades para el sitio web de Autoshield
 */

document.addEventListener('DOMContentLoaded', function() {
  // Variables globales
  const header = document.querySelector('.main-header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  const yearSpan = document.getElementById('currentYear');
  
  // Inicialización de funcionalidades
  initHeaderScroll();
  initMobileMenu();
  initDropdowns();
  initHeroSlider();
  initProductTabs();
  initProjectFilter();
  initTestimonialSlider();
  initContactForm();
  setCurrentYear();
  initSmoothScroll();
  preloadSliderImages();
  
  /**
   * Header con efecto scroll
   */
  function initHeaderScroll() {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  /**
   * Menú móvil
   */
  function initMobileMenu() {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenuBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (navMenu.classList.contains('active')) {
          mobileMenuBtn.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      });
    });
  }
  
  /**
   * Manejo de dropdowns en móvil
   */
  function initDropdowns() {
    // En móvil, los dropdowns se activan con click
    const isMobile = window.innerWidth < 992;
    
    if (isMobile) {
      dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
          e.preventDefault();
          
          const parent = this.parentElement;
          const dropdownMenu = parent.querySelector('.dropdown-menu');
          
          // Cerrar otros dropdowns
          document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            if (menu !== dropdownMenu) {
              menu.classList.remove('show');
            }
          });
          
          // Toggle del dropdown actual
          dropdownMenu.classList.toggle('show');
        });
      });
    }
    
    // Ajuste de dropdowns en redimensionamiento
    window.addEventListener('resize', function() {
      const isNowMobile = window.innerWidth < 992;
      
      if (isNowMobile !== isMobile) {
        // Reiniciar dropdowns
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
          menu.classList.remove('show');
        });
      }
    });
  }
  
  /**
   * Slider de Hero - Versión corregida
   */
  function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    
    // Verificar si hay slides para evitar errores
    if (slides.length === 0) {
      console.warn('No se encontraron slides en el hero slider');
      return;
    }
    
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.hero-slider .slider-arrow.prev');
    const nextBtn = document.querySelector('.hero-slider .slider-arrow.next');
    
    // Verificar si los botones existen
    if (!prevBtn || !nextBtn) {
      console.warn('No se encontraron botones de navegación en el slider');
      return;
    }
    
    let currentSlide = 0;
    let slideInterval;
    
    // Función para cambiar slide
    const goToSlide = (index) => {
      // Validar que el índice sea correcto
      if (index < 0 || index >= slides.length) {
        console.error('Índice de slide fuera de rango:', index);
        return;
      }
      
      // Remover clase active de slides y dots
      slides.forEach(slide => slide.classList.remove('active'));
      if (dots && dots.length) {
        dots.forEach(dot => dot.classList.remove('active'));
      }
      
      // Agregar clase active al slide y dot actual
      slides[index].classList.add('active');
      if (dots && dots[index]) {
        dots[index].classList.add('active');
      }
      
      // Actualizar currentSlide
      currentSlide = index;
    };
    
    // Función para slide siguiente
    const nextSlide = () => {
      const nextIndex = (currentSlide + 1) % slides.length;
      goToSlide(nextIndex);
    };
    
    // Función para slide anterior
    const prevSlide = () => {
      const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      goToSlide(prevIndex);
    };
    
    // Iniciar autoplay
    const startAutoplay = () => {
      // Limpiar cualquier intervalo existente primero
      stopAutoplay();
      slideInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
    };
    
    // Detener autoplay
    const stopAutoplay = () => {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    };
    
    // Eventos de botones
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevenir comportamiento predeterminado
      prevSlide();
      stopAutoplay();
      startAutoplay();
    });
    
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevenir comportamiento predeterminado
      nextSlide();
      stopAutoplay();
      startAutoplay();
    });
    
    // Eventos de dots
    if (dots && dots.length) {
      dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          goToSlide(index);
          stopAutoplay();
          startAutoplay();
        });
      });
    }
    
    // Pausar autoplay cuando el mouse está sobre el slider
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
      heroSlider.addEventListener('mouseenter', stopAutoplay);
      heroSlider.addEventListener('mouseleave', startAutoplay);
    }
    
    // Iniciar autoplay al cargar
    startAutoplay();
  }
  
  /**
   * Precargar imágenes del slider para mejorar rendimiento
   */
  function preloadSliderImages() {
    const slideImages = document.querySelectorAll('.slide img');
    
    slideImages.forEach(img => {
      const src = img.getAttribute('src');
      if (src) {
        const preloadImg = new Image();
        preloadImg.src = src;
      }
    });
  }
  
  /**
   * Tabs de productos
   */
  function initProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remover active de todos los botones
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Agregar active al botón clickeado
        this.classList.add('active');
        
        // Obtener categoría
        const category = this.getAttribute('data-category');
        
        // Ocultar todos los contenidos
        document.querySelectorAll('.category-content').forEach(content => {
          content.classList.remove('active');
        });
        
        // Mostrar el contenido seleccionado
        const targetContent = document.getElementById(`${category}-content`);
        if (targetContent) {
          targetContent.classList.add('active');
        } else {
          console.error(`No se encontró el contenido para la categoría: ${category}`);
        }
      });
    });
  }
  
  /**
   * Filtro de proyectos
   */
  function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-item');
    
    if (!filterButtons.length || !projects.length) return;
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remover active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Agregar active al botón clickeado
        this.classList.add('active');
        
        // Obtener filtro
        const filter = this.getAttribute('data-filter');
        
        // Filtrar proyectos
        projects.forEach(project => {
          const category = project.getAttribute('data-category');
          
          if (filter === 'all' || filter === category) {
            project.classList.remove('hide');
            setTimeout(() => {
              project.style.display = 'block';
            }, 300);
          } else {
            project.classList.add('hide');
            setTimeout(() => {
              project.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  /**
   * Slider de testimonios
   */
  function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-nav.prev');
    const nextBtn = document.querySelector('.testimonial-nav.next');
    
    // Si no hay elementos, salir
    if (!testimonials.length || !prevBtn || !nextBtn) return;
    
    let currentTestimonial = 0;
    
    // Función para cambiar testimonio
    const goToTestimonial = (index) => {
      // Remover clase active de testimonios y dots
      testimonials.forEach(testimonial => testimonial.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Agregar clase active al testimonio y dot actual
      testimonials[index].classList.add('active');
      if (dots[index]) dots[index].classList.add('active');
      
      // Actualizar currentTestimonial
      currentTestimonial = index;
    };
    
    // Función para testimonio siguiente
    const nextTestimonial = () => {
      const nextIndex = (currentTestimonial + 1) % testimonials.length;
      goToTestimonial(nextIndex);
    };
    
    // Función para testimonio anterior
    const prevTestimonial = () => {
      const prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      goToTestimonial(prevIndex);
    };
    
    // Eventos de botones
    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);
    
    // Eventos de dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToTestimonial(index);
      });
    });
  }
  
  /**
   * Formulario de contacto
   */
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí iría el envío del formulario, por ahora simularemos éxito
        // En implementación real, enviar con fetch a Formspree
        
        // Simulación de envío exitoso
        setTimeout(() => {
          formSuccess.style.display = 'block';
          contactForm.reset();
          
          // Ocultar mensaje después de 5 segundos
          setTimeout(() => {
            formSuccess.style.display = 'none';
          }, 5000);
        }, 1000);
      });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí iría el código para suscripción al newsletter
        alert('¡Gracias por suscribirse a nuestro newsletter!');
        newsletterForm.reset();
      });
    }
  }
  
  /**
   * Actualizar año actual en el footer
   */
  function setCurrentYear() {
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }
  
  /**
   * Scroll suave para enlaces internos
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Si es un enlace vacío o un dropdown, no hacer nada
        if (href === '#' || this.classList.contains('dropdown-toggle')) {
          return;
        }
        
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
  }
});
