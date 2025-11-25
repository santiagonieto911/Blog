// ===== EFECTOS INTERACTIVOS PORTADA =====

document.addEventListener('DOMContentLoaded', () => {
    // Efecto de movimiento del mouse en el fondo
    const shapes = document.querySelectorAll('.shape');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const moveX = (mouseX - 0.5) * 30 * (index + 1);
            const moveY = (mouseY - 0.5) * 30 * (index + 1);
            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Agregar event listener al botón
    const btnContinuar = document.querySelector('.btn-continuar');
    if (btnContinuar) {
        btnContinuar.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });

        btnContinuar.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});
