// ===== ACTUALIZAR HORA EN TIEMPO REAL =====
function updateTime() {
    const now = new Date();
    
    // Hora
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Determinar AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const hoursStr = String(hours).padStart(2, '0');
    
    document.getElementById('hora').textContent = `${hoursStr}:${minutes}`;
    document.getElementById('ampm').textContent = ampm;
    
    // Fecha
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormato = now.toLocaleDateString('es-ES', options);
    document.getElementById('fecha').textContent = fechaFormato;
    
    // Día de la semana
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    document.getElementById('dia').textContent = diasSemana[now.getDay()];
    
    // Porcentaje del día completado
    updateDayProgress(now);
}

// ===== CALCULAR PROGRESO DEL DÍA =====
function updateDayProgress(now) {
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    
    const elapsedMs = now - startOfDay;
    const totalMs = endOfDay - startOfDay;
    const percentage = Math.round((elapsedMs / totalMs) * 100);
    
    document.getElementById('porcentaje').textContent = percentage + '%';
    
    // Actualizar círculo de progreso
    const circle = document.getElementById('progressCircle');
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = strokeDashoffset;
}

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    setInterval(updateTime, 1000);
    
    // Inicializar carrusel de tips
    initializeCarousel();
});

// ===== CARRUSEL DE TIPS =====
let currentSlide = 0;
let autoSlideInterval;

function initializeCarousel() {
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Agregar event listeners a los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
    });
    
    // Agregar event listeners a las flechas
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + getTotalSlides()) % getTotalSlides();
            updateCarousel();
            resetAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }
    
    // Iniciar auto-scroll
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 4000); // Cambiar cada 4 segundos
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function nextSlide() {
    const slides = document.querySelectorAll('.tip-slide');
    const totalSlides = slides.length;
    
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function getTotalSlides() {
    const slides = document.querySelectorAll('.tip-slide');
    return slides.length;
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const slides = document.querySelectorAll('.tip-slide');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next');
        
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentSlide) {
            indicator.classList.add('active');
        }
    });
}
