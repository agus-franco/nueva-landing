// ===================================
// CONFIGURACIÓN Y CONSTANTES
// ===================================

const CONFIG = {
    // Aquí pueden agregar sus endpoints de API
    API_ENDPOINTS: {
        register: '/api/register',
        login: '/api/login',
        googleAuth: '/api/auth/google'
    }
};

// ===================================
// FUNCIONES DE UTILIDAD
// ===================================

/**
 * Función helper para hacer requests a la API
 * @param {string} url - URL del endpoint
 * @param {object} options - Opciones del fetch
 */
async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en la petición:', error);
        throw error;
    }
}

/**
 * Muestra un mensaje de notificación al usuario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de mensaje (success, error, info)
 */
function showNotification(message, type = 'info') {
    // TODO: Implementar un sistema de notificaciones toast
    console.log(`[${type.toUpperCase()}] ${message}`);
    alert(message); // Placeholder temporal
}

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// FUNCIONES DE NAVEGACIÓN
// ===================================

/**
 * Función para redirigir a la página de creación de club
 * Los programadores deben implementar el destino correcto
 */
function redirectToCreateClub() {
    console.log('Redirigiendo a crear club...');
    // TODO: Implementar la redirección correcta
    // window.location.href = '/crear-club';
    showNotification('Funcionalidad de creación de club - Por implementar', 'info');
}

/**
 * Función para redirigir al login
 * Los programadores deben implementar el destino correcto
 */
function redirectToLogin() {
    console.log('Redirigiendo al login...');
    // TODO: Implementar la redirección correcta
    // window.location.href = '/login';
    showNotification('Funcionalidad de login - Por implementar', 'info');
}

// ===================================
// EVENT LISTENERS
// ===================================

/**
 * Inicializa todos los event listeners cuando el DOM está listo
 */
function initializeEventListeners() {
    // Botones de "Crear club" en header y hero
    const btnHeaderCreate = document.getElementById('btn-header-create');
    const btnHeroCreate = document.getElementById('btn-hero-create');
    
    if (btnHeaderCreate) {
        btnHeaderCreate.addEventListener('click', redirectToCreateClub);
    }
    
    if (btnHeroCreate) {
        btnHeroCreate.addEventListener('click', redirectToCreateClub);
    }

    // Botón CTA final "Comenzá gratis"
    const btnCtaFinal = document.getElementById('btn-cta-final');
    if (btnCtaFinal) {
        btnCtaFinal.addEventListener('click', redirectToCreateClub);
    }

    // Smooth scroll para navegación interna (si se agregan anclas)
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

// ===================================
// FUNCIONES DE ANIMACIÓN
// ===================================

/**
 * Agrega animaciones de scroll reveal a elementos
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar secciones para animaciones
    document.querySelectorAll('.feature-section, .benefit-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Maneja el efecto parallax suave en elementos decorativos
 */
function initializeParallax() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                // Parallax en elementos decorativos (opcional)
                const decorativeElements = document.querySelectorAll('.decorative-bg, .cta-decorative-bg');
                decorativeElements.forEach(el => {
                    const speed = 0.5;
                    el.style.transform = `translateY(${scrolled * speed}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// ===================================
// IMAGE LOADER
// ===================================

/**
 * Configuración de la carpeta de imágenes
 * Cambia esta ruta si tus imágenes están en otra ubicación
 */
const IMAGES_FOLDER = 'images/';

/**
 * Inicializa todas las imágenes usando el atributo data-image
 * Solo necesitas especificar el nombre del archivo en data-image="nombre.png"
 */
function initializeImages() {
    const images = document.querySelectorAll('img[data-image]');
    
    images.forEach(img => {
        const imageName = img.getAttribute('data-image');
        if (imageName) {
            img.src = IMAGES_FOLDER + imageName;
        }
    });
    
    console.log(`✓ ${images.length} imágenes inicializadas desde ${IMAGES_FOLDER}`);
}

// ===================================
// INICIALIZACIÓN
// ===================================

/**
 * Función principal que se ejecuta cuando el DOM está listo
 */
function init() {
    console.log('Inicializando landing page de Suscri...');
    
    // Inicializar imágenes primero
    initializeImages();
    
    // Inicializar event listeners
    initializeEventListeners();
    
    // Inicializar animaciones (opcional)
    initializeScrollAnimations();
    
    // Inicializar parallax (opcional)
    // initializeParallax();
    
    console.log('Landing page inicializada correctamente');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===================================
// EXPORTS PARA USO EXTERNO
// ===================================

// Si tus programadores necesitan acceder a estas funciones desde otros archivos
window.SuscriLanding = {
    redirectToCreateClub,
    redirectToLogin,
    showNotification,
    isValidEmail
};

// ===================================
// NOTAS PARA LOS PROGRAMADORES
// ===================================

/*
INSTRUCCIONES PARA IMPLEMENTACIÓN:

1. CREAR CLUB:
   - Funciones: redirectToCreateClub()
   - Botones: #btn-header-create, #btn-hero-create, #btn-cta-final
   - Actualizar la URL de destino en la función

2. LOGIN:
   - Función: redirectToLogin()
   - Actualizar la URL de destino en la función

3. NOTIFICACIONES:
   - Función: showNotification(message, type)
   - Reemplazar el alert() con un sistema de toast/notifications más elegante
   - Sugerencia: usar librerías como toastify-js, notyf, o implementar custom

4. API CONFIGURATION:
   - Actualizar CONFIG.API_ENDPOINTS con los endpoints reales
   - Agregar autenticación/headers necesarios en apiRequest()

5. OPCIONAL - ANIMACIONES:
   - Las funciones de animación están comentadas
   - Descomentar initializeParallax() en init() si se desea el efecto parallax
   - Agregar clases CSS para .animate-in si se usa scroll reveal

6. TESTING:
   - Todos los botones tienen console.log para debugging
   - Verificar que todos los IDs coincidan con el HTML
   - Testear flujos de error y success
*/
