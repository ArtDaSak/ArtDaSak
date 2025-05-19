// Dynamically adjust body height based on content
document.body.style.height = `${window.innerHeight * 3}px`;
window.addEventListener('resize', () => {
    document.body.style.height = `${window.innerHeight * 3}px`;
});
const rings = document.querySelectorAll('.ring');
const ringsCount = rings.length;
const maxScroll = 400; // Ajusta para controlar el efecto
const maxScale = 8;    // Escala máxima de los rings
const maxBlur = 30;    // Difuminado máximo

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const zOffset = scrollPosition / 2;
    document.querySelector('.rings').style.transform = `translate(-50%, -50%) translateZ(${zOffset}px)`;

    // Desvanecer y escalar el texto central
    const text = document.getElementById('centerText');
    let progress = Math.min(scrollPosition / 200, 1);
    let scale = 1 - 0.5 * progress;
    let opacity = 1 - progress;
    text.style.opacity = opacity;
    text.style.transform = `translate(-50%, -50%) scale(${scale})`;

    // Efecto en los rings con blur modificado
    rings.forEach((ring, i) => {
        const baseZ = -100 * (i + 1);
        let ringProgress = Math.min(scrollPosition / (maxScroll - i * 20), 1);

        // Blur solo empieza después del 50% de progreso y es 25% más lento
        let blurProgress = 0;
        if (ringProgress > 0.5) {
            blurProgress = ((ringProgress - 0.5) / 0.5) * 0.75;
            blurProgress = Math.min(blurProgress, 1);
        }
        let ringScale = 1.5 + (maxScale - 1.5) * ringProgress;
        let ringOpacity = 1 - ringProgress;
        let ringBlur = maxBlur * blurProgress;

        ring.style.transform = `translate(-50%, -50%) translateZ(${baseZ}px) scale(${ringScale})`;
        ring.style.opacity = ringOpacity;
        ring.style.filter = `blur(${ringBlur}px)`;
    });

    // Mostrar fondo negro al final
    const backgroundFinal = document.getElementById('backgroundFinal');
    backgroundFinal.style.opacity = scrollPosition > maxScroll ? 1 : 0;
});
