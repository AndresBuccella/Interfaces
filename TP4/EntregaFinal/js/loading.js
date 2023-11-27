document.addEventListener("DOMContentLoaded", function () {
    const numeroElemento = document.getElementById('loading-contador');
    const loading = document.getElementById('loading');
    let numero = 0;
    // Deshabilitar el scroll en el documento
    function disableScroll() {
        // Guardar la posición actual del scroll
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
        // Deshabilitar el scroll en el documento
        window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
        };
    }
    disableScroll();
  
    // Habilitar el scroll en el documento
    function enableScroll() {
        window.onscroll = null;
    }
    function contar() {
        if (numero < 100) {
            numero++;
            numeroElemento.textContent = numero + "%";
        } else if (numero == 100) {
            clearInterval(interval);
            loading.classList.add("loading-close");
            enableScroll();
        }
    }
    loading.addEventListener("animationend", function () {
        loading.remove();
    })
    interval = setInterval(contar, 5000 / 100);
});