document.addEventListener('DOMContentLoaded', () => {
    const cover = document.getElementById('cover');
    const book = document.getElementById('book');
    let isOpen = false;
    let loveAnimationTriggered = false;

    // 1. Animación continua (flotación en 3D) de la tarjeta antes de abrir
    const floatingAnimation = anime({
        targets: '.book',
        translateY: [-15, 15],
        rotateX: [3, -3],
        rotateY: [-3, 3],
        duration: 4000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });

    // 2. Lógica para abrir/cerrar la tarjeta al hacer click
    cover.addEventListener('click', () => {
        if (!isOpen) {
            // Abrir tarjeta
            cover.classList.add('open');
            book.classList.add('open');
            isOpen = true;

            // Pausar un poco la flotación para enfocarse en la lectura
            floatingAnimation.pause();

            // 3. Disparar la animación del texto "I LOVE YOU" solo cuando la carta se abre
            if (!loveAnimationTriggered) {
                setTimeout(() => {
                    playLoveAnimation();
                    loveAnimationTriggered = true;
                }, 1200); // Esperar a que la página termine de rotar
            }

        } else {
            // Cerrar tarjeta
            cover.classList.remove('open');
            book.classList.remove('open');
            isOpen = false;
            
            // Reanudar flotación
            floatingAnimation.play();
        }
    });

    // Función para la animación espectacular del "I LOVE YOU" usando Anime.js
    function playLoveAnimation() {
        // Animación de cada letra cayendo y rotando en el eje X
        anime({
            targets: '.love-letter',
            opacity: [0, 1],
            rotateX: [-90, 0],
            translateY: [40, 0],
            translateZ: [50, 0],
            delay: anime.stagger(150), // Aparecen una por una
            easing: 'easeOutElastic(1, .5)', // Efecto de rebote
            duration: 1500
        });

        // Animación del corazón latiendo y escalando al final
        anime({
            targets: '.heart-icon',
            opacity: [0, 1],
            scale: [0, 1.8, 1],
            rotate: '1turn',
            delay: 150 * 10 + 200, // Se ejecuta después de todas las letras
            duration: 1200,
            easing: 'easeOutElastic(1, .4)',
            complete: function() {
                // Hacer que el corazón lata infinitamente después de aparecer
                anime({
                    targets: '.heart-icon',
                    scale: [1, 1.2],
                    duration: 600,
                    direction: 'alternate',
                    loop: true,
                    easing: 'easeInOutQuad'
                });
            }
        });
    }
});
