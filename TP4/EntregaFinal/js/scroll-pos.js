let scrollPosition;

function getScrollPosition() {
    return window.scrollY || window.pageYOffset;
}

// Ejemplo de cómo usar la función
window.addEventListener('scroll', function () {
    scrollPosition = getScrollPosition();
    console.log('Posición de scroll:', scrollPosition);
});