// Autoshield - create.js
// Script para el sitio web de servicios de protección vehicular

document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const header = document.querySelector('.main-header');
    const navMenu = document.getElementById('navMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const sections = document.querySelectorAll('section');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const categoryContents = document.querySelectorAll('.category-content');
    
    // ===== NAVEGACIÓN =====
    
    // Navegación sticky
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Animación de secciones al hacer scroll
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 300;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (window.scrollY > sectionTop && window.scrollY <= sectionTop + sectionHeight) {
                section.classList.add('active');
                // Actualizar navegación activa si corresponde
                navMenu.querySelectorAll('a').forEach(link => {
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Menú de navegación móvil
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Solo aplicar a enlaces internos que apuntan a ID existentes
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) { // Evitar href="#" vacíos
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Cerrar menú móvil si está abierto
                    if (navMenu.classList.contains('show')) {
                        navMenu.classList.remove('show');
                        mobileMenuBtn.classList.remove('active');
                    }
                    
                    // Calcular offset considerando header sticky
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Manejo de dropdowns en móvil
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
    
    // ===== PRODUCTOS / TABS SYSTEM =====
    
    // Sistema de pestañas para productos
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Agregar clase activa al botón clicado
            this.classList.add('active');
            
            // Mostrar contenido correspondiente
            const category = this.getAttribute('data-category');
            categoryContents.forEach(content => {
                content.classList.remove('active');
            });
            
            document.getElementById(category + '-content').classList.add('active');
        });
    });
    
    // ===== FORMULARIO DE CONTACTO =====
    
    // Inicializar el formulario de contacto
    initializeContactForm();
    
    // ===== EFECTOS Y ANIMACIONES =====
    
    // Inicializar animaciones al scroll
    initializeScrollAnimations();
    
    // Inicializar año actual en el footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Inicializar la sección PPF si estamos en ella
    if (window.location.hash === '#ppf') {
        setTimeout(() => {
            initializePPFSection();
        }, 500);
    }

    // Agregar clases de animación a elementos clave
    addAnimationClasses();
});

// Función para inicializar formulario
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Manejar envío de formulario
    form.addEventListener('submit', function(e) {
        // Formspree ya se encarga del envío, solo agregamos mejoras visuales
        
        // Mostrar mensaje de éxito cuando se envía 
        form.addEventListener('formspree:submitted', function(e) {
            // Mostrar mensaje de éxito
            const successMessage = document.getElementById('formSuccess');
            if (successMessage) {
                successMessage.style.display = 'block';
                
                // Resetear formulario
                form.reset();
                
                // Ocultar mensaje después de un tiempo
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    });
    
    // Mejorar experiencia de formulario
    form.querySelectorAll('input, textarea, select').forEach(field => {
        // Clase active en labels cuando el campo tiene contenido
        field.addEventListener('blur', function() {
            const label = this.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                if (this.value.trim() !== '') {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            }
        });
        
        // Agregar clase de foco al contenedor
        field.addEventListener('focus', function() {
            const formGroup = this.closest('.form-group');
            if (formGroup) {
                formGroup.classList.add('focused');
            }
        });
        
        field.addEventListener('blur', function() {
            const formGroup = this.closest('.form-group');
            if (formGroup) {
                formGroup.classList.remove('focused');
            }
        });
    });
    
    // Inicializar formulario de newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '') {
                // Simular éxito de suscripción
                const subscribeBtn = this.querySelector('button');
                const originalText = subscribeBtn.textContent;
                
                subscribeBtn.disabled = true;
                subscribeBtn.textContent = 'Procesando...';
                
                // Simular proceso
                setTimeout(() => {
                    emailInput.value = '';
                    subscribeBtn.textContent = '¡Suscrito!';
                    
                    setTimeout(() => {
                        subscribeBtn.disabled = false;
                        subscribeBtn.textContent = originalText;
                    }, 2000);
                }, 1000);
            }
        });
    }
}

// Función para inicializar animaciones al hacer scroll
function initializeScrollAnimations() {
    // Elementos que se animarán al hacer scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Configuración del observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observar elementos
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Inicializar contadores si existen
    const counters = document.querySelectorAll('.counter-value');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // ms
                    const step = Math.ceil(target / (duration / 16)); // 60fps aprox
                    
                    let count = 0;
                    const updateCount = () => {
                        count += step;
                        if (count < target) {
                            counter.textContent = count;
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCount();
                    counterObserver.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
}

// Función para inicializar características específicas de la sección PPF
function initializePPFSection() {
    const ppfSection = document.querySelector('#ppf');
    if (!ppfSection) return;
    
    // Crear sección de demostración PPF si no existe
    if (!ppfSection.querySelector('.ppf-demo-container')) {
        // Crear el contenedor de demostración
        const demoContainer = document.createElement('div');
        demoContainer.className = 'ppf-demo-container';
        
        // Añadir título
        const demoTitle = document.createElement('h3');
        demoTitle.className = 'ppf-demo-title';
        demoTitle.textContent = 'Tecnología multi-capa para protección superior';
        demoContainer.appendChild(demoTitle);
        
        // Crear un div para contener las capas
        const layersWrapper = document.createElement('div');
        layersWrapper.className = 'ppf-layers-wrapper';
        
        // Definir las capas
        const layers = [
            { label: 'Capa superior autorreparable', color: 'rgba(255, 255, 255, 0.85)', icon: 'fa-shield-alt' },
            { label: 'Capa resistente a impactos', color: 'rgba(220, 220, 220, 0.8)', icon: 'fa-car-crash' },
            { label: 'Capa adhesiva de alta tecnología', color: 'rgba(200, 200, 200, 0.75)', icon: 'fa-toolbox' },
            { label: 'Pintura del vehículo', color: 'rgba(180, 180, 180, 0.7)', icon: 'fa-paint-roller' }
        ];
        
        // Crear las capas
        layers.forEach((layer, index) => {
            const layerElement = document.createElement('div');
            layerElement.className = 'ppf-layer';
            layerElement.style.backgroundColor = layer.color;
            layerElement.style.zIndex = layers.length - index;
            
            const layerContent = document.createElement('div');
            layerContent.className = 'layer-content';
            
            const layerIcon = document.createElement('i');
            layerIcon.className = `fas ${layer.icon} layer-icon`;
            
            const layerLabel = document.createElement('span');
            layerLabel.className = 'layer-label';
            layerLabel.textContent = layer.label;
            
            layerContent.appendChild(layerIcon);
            layerContent.appendChild(layerLabel);
            layerElement.appendChild(layerContent);
            
            layersWrapper.appendChild(layerElement);
            
            // Animar entrada con delay
            setTimeout(() => {
                layerElement.classList.add('active');
            }, index * 250);
        });
        
        demoContainer.appendChild(layersWrapper);
        
        // Crear descripción
        const demoDescription = document.createElement('p');
        demoDescription.className = 'ppf-demo-description';
        demoDescription.textContent = 'Nuestras láminas PPF ofrecen una protección invisible que mantiene la apariencia original de su vehículo mientras lo protege de impactos, rayones y agentes externos. La tecnología de auto-reparación elimina pequeños rasguños con el simple calor del sol o agua caliente.';
        demoContainer.appendChild(demoDescription);
        
        // Agregar la demostración a la sección PPF después del primer párrafo
        const firstParagraph = ppfSection.querySelector('p');
        if (firstParagraph) {
            firstParagraph.parentNode.insertBefore(demoContainer, firstParagraph.nextSibling);
        } else {
            const sectionHeader = ppfSection.querySelector('.section-header');
            if (sectionHeader) {
                sectionHeader.after(demoContainer);
            } else {
                ppfSection.appendChild(demoContainer);
            }
        }
        
        // Agregar interactividad a las capas
        const layers3D = layersWrapper.querySelectorAll('.ppf-layer');
        
        layersWrapper.addEventListener('mousemove', (e) => {
            const rect = layersWrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            layers3D.forEach((layer, index) => {
                const shift = (index + 1) * 5;
                layer.style.transform = `translateX(${x * shift}px) translateY(${y * shift}px)`;
            });
        });
        
        layersWrapper.addEventListener('mouseleave', () => {
            layers3D.forEach(layer => {
                layer.style.transform = 'translateX(0) translateY(0)';
            });
        });
    }
    
    // Agregar sección de preguntas frecuentes si no existe
    if (!ppfSection.querySelector('.faq-container')) {
        // Crear contenedor de FAQ
        const faqContainer = document.createElement('div');
        faqContainer.className = 'faq-container';
        
        // Añadir título de FAQ
        const faqTitle = document.createElement('h3');
        faqTitle.className = 'faq-title';
        faqTitle.textContent = 'Preguntas Frecuentes sobre PPF';
        faqContainer.appendChild(faqTitle);
        
        // Definir preguntas y respuestas
        const faqs = [
            {
                question: '¿Cuánto tiempo dura el PPF?',
                answer: 'Nuestras láminas de protección PPF tienen una garantía de 10 años contra amarilleo y desprendimiento. Con el mantenimiento adecuado, pueden proteger su vehículo por más de una década manteniendo sus propiedades autocurativas.'
            },
            {
                question: '¿El PPF altera el color original del vehículo?',
                answer: 'No, el PPF es completamente transparente y está diseñado para ser prácticamente invisible una vez instalado. No altera el color ni el brillo de la pintura original, solo añade una capa de protección que preserva su apariencia.'
            },
            {
                question: '¿Qué mantenimiento requiere el PPF?',
                answer: 'El mantenimiento es muy sencillo. Se recomienda el lavado regular con productos neutros, evitando ceras que puedan afectar las propiedades del material. No requiere pulidos ni tratamientos especiales, a diferencia de la pintura sin protección.'
            },
            {
                question: '¿Se puede instalar PPF en vehículos usados?',
                answer: 'Sí, el PPF puede instalarse en vehículos nuevos o usados. Para vehículos usados, realizamos un proceso de preparación que incluye descontaminación y corrección de pintura para asegurar una instalación perfecta.'
            },
            {
                question: '¿El PPF protege contra rayones profundos?',
                answer: 'El PPF está diseñado para proteger contra rayones superficiales, impactos leves de piedras, insectos y contaminación ambiental. Para daños más severos como rayones profundos que penetran la pintura, proporcionará cierta protección, pero no es indestructible.'
            }
        ];
        
        // Crear elementos FAQ
        faqs.forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            
            const question = document.createElement('div');
            question.className = 'faq-question';
            question.innerHTML = `${faq.question} <i class="fas fa-chevron-down"></i>`;
            
            const answer = document.createElement('div');
            answer.className = 'faq-answer';
            answer.innerHTML = `<p>${faq.answer}</p>`;
            
            faqItem.appendChild(question);
            faqItem.appendChild(answer);
            faqContainer.appendChild(faqItem);
            
            // Funcionalidad de acordeón
            question.addEventListener('click', function() {
                faqItem.classList.toggle('active');
                
                if (faqItem.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0';
                }
                
                // Cerrar otros items abiertos
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem && item.classList.contains('active')) {
                        item.classList.remove('active');
                        item.querySelector('.faq-answer').style.maxHeight = '0';
                    }
                });
            });
        });
        
        // Añadir FAQ al final de la sección
        ppfSection.appendChild(faqContainer);
    }
    
    // Agregar sección de comparación antes/después si no existe
    if (!ppfSection.querySelector('.comparison-container')) {
        // Crear contenedor de comparación
        const comparisonContainer = document.createElement('div');
        comparisonContainer.className = 'comparison-container';
        
        // Añadir título
        const comparisonTitle = document.createElement('h3');
        comparisonTitle.className = 'comparison-title';
        comparisonTitle.textContent = 'Vea la diferencia';
        comparisonContainer.appendChild(comparisonTitle);
        
        // Crear slider de comparación
        const comparisonSlider = document.createElement('div');
        comparisonSlider.className = 'comparison-slider';
        
        // Imágenes antes/después (usan placeholders por ahora)
        const beforeImage = document.createElement('div');
        beforeImage.className = 'before';
        beforeImage.innerHTML = '<img src="assets/before-ppf.jpg" alt="Vehículo sin protección PPF">';
        
        const afterImage = document.createElement('div');
        afterImage.className = 'after';
        afterImage.innerHTML = '<img src="assets/after-ppf.jpg" alt="Vehículo con protección PPF">';
        
        comparisonSlider.appendChild(beforeImage);
        comparisonSlider.appendChild(afterImage);
        
        // Agregar control deslizante
        const sliderHandle = document.createElement('div');
        sliderHandle.className = 'comparison-handle';
        sliderHandle.innerHTML = '<i class="fas fa-chevron-left"></i><i class="fas fa-chevron-right"></i>';
        comparisonSlider.appendChild(sliderHandle);
        
        // Configuración inicial
        afterImage.style.width = '50%';
        sliderHandle.style.left = '50%';
        
        // Añadir interactividad al slider
        let isDragging = false;
        
        sliderHandle.addEventListener('mousedown', () => {
            isDragging = true;
        });
        
        comparisonSlider.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const rect = comparisonSlider.getBoundingClientRect();
            let position = (e.clientX - rect.left) / rect.width;
            position = Math.max(0, Math.min(position, 1));
            
            afterImage.style.width = position * 100 + '%';
            sliderHandle.style.left = position * 100 + '%';
        });
        
        window.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        // Soporte táctil
        sliderHandle.addEventListener('touchstart', (e) => {
            isDragging = true;
            e.preventDefault();
        });
        
        comparisonSlider.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const rect = comparisonSlider.getBoundingClientRect();
            const touch = e.touches[0];
            let position = (touch.clientX - rect.left) / rect.width;
            position = Math.max(0, Math.min(position, 1));
            
            afterImage.style.width = position * 100 + '%';
            sliderHandle.style.left = position * 100 + '%';
            
            e.preventDefault();
        });
        
        window.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        comparisonContainer.appendChild(comparisonSlider);
        
        // Añadir leyenda explicativa
        const comparisonDescription = document.createElement('p');
        comparisonDescription.className = 'comparison-description';
        comparisonDescription.textContent = 'Deslice para comparar la diferencia entre un vehículo expuesto a daños ambientales y uno protegido con nuestras láminas PPF. La diferencia es clara: protección invisible pero efectiva.';
        comparisonContainer.appendChild(comparisonDescription);
        
        // Agregar el contenedor de comparación a la sección PPF
        ppfSection.appendChild(comparisonContainer);
    }
}

// Función para agregar clases de animación a elementos clave
function addAnimationClasses() {
    // Agregar clases de animación a secciones principales
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
    });
    
    // Agregar clases específicas para diferentes elementos
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.15}s`;
    });
    
    document.querySelectorAll('.value-item').forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    document.querySelectorAll('.mission-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('animate-on-scroll');
    });
    
    document.querySelectorAll('.contact-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.15}s`;
    });
    
    // Animaciones para entrada de formulario
    document.querySelectorAll('.form-group').forEach((formGroup, index) => {
        formGroup.classList.add('animate-on-scroll');
        formGroup.style.animationDelay = `${index * 0.1}s`;
    });
}
