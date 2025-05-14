// script.js - Código JavaScript corregido para funcionar con el nuevo slider

document.addEventListener('DOMContentLoaded', function() {
  
  // Inicializar el carrusel de Bootstrap
  const heroCarousel = new bootstrap.Carousel(document.getElementById('heroCarousel'), {
    interval: 5000,  // Cambio cada 5 segundos
    keyboard: true,  // Permitir control con teclado
    pause: 'hover',  // Pausar al posicionar el cursor
    wrap: true       // Vuelta continua al final
  });
  
  // Header scroll effect
  const header = document.querySelector('.main-header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
  
  // Dropdown menus on mobile
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
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
  
  // Product tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const categoryContents = document.querySelectorAll('.category-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all tab buttons and contents
      tabBtns.forEach(b => b.classList.remove('active'));
      categoryContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      document.getElementById(`${category}-content`).classList.add('active');
    });
  });
  
  // Project filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all filter buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
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
  
  // Testimonials slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
  const testimonialPrev = document.querySelector('.testimonial-nav.prev');
  const testimonialNext = document.querySelector('.testimonial-nav.next');
  
  let currentSlide = 0;
  
  // Function to show a specific slide
  function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    // Show the current slide
    testimonialSlides[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    
    currentSlide = index;
  }
  
  // Initialize with first slide
  showSlide(0);
  
  // Next slide
  if (testimonialNext) {
    testimonialNext.addEventListener('click', function() {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    });
  }
  
  // Previous slide
  if (testimonialPrev) {
    testimonialPrev.addEventListener('click', function() {
      currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
      showSlide(currentSlide);
    });
  }
  
  // Testimonial dot navigation
  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      showSlide(index);
    });
  });
  
  // Auto advance testimonials
  setInterval(function() {
    if (document.visibilityState === 'visible') {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    }
  }, 8000);
  
  // Form validation and submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Formspree handles the form submission
      // You can add additional validation here if needed
      
      // Show success message (after form is actually submitted)
      setTimeout(function() {
        const formSuccess = document.getElementById('formSuccess');
        if (formSuccess) {
          formSuccess.style.display = 'block';
          // Optional: Reset form
          // contactForm.reset();
        }
      }, 1000);
    });
  }
  
  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Handle newsletter subscription
      // Add your newsletter subscription logic here
      
      // Example: Show a success message
      alert('¡Gracias por suscribirse a nuestro newsletter!');
      newsletterForm.reset();
    });
  }
  
  // Update current year in footer
  const currentYearSpan = document.getElementById('currentYear');
  
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
  
  // Smooth scrolling for anchor links
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
          
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
