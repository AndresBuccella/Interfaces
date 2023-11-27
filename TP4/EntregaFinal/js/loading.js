document.addEventListener("DOMContentLoaded", function () {
    const numeroElemento = document.getElementById('loading-contador');
    const loading = document.getElementById('loading');
    let numero = 0;
    // Disable scrolling in the document
    function disableScroll() {
        // Guarda la posición actual del scroll
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    
        // Returns the scroll to its original position
        window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
        };
    }
    disableScroll();
  
    // Enable scrolling in the document
    function enableScroll() {
        window.onscroll = null;
    }

    /**
     * Increments the value of `numero` and updates the `numeroElemento.textContent` 
     * accordingly. If `numero` is less than 100, it increments `numero` by 1 and updates 
     * the text content of `numeroElemento` with the new value suffixed by "%". If `numero` 
     * is equal to 100, it clears the `interval`, adds the "loading-close" class to 
     * `loading`, and enables scrolling.
     *
     */
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

    /**
     * Adds an event listener to the "loading" element to detect the end of a CSS animation.
     * When the animation ends, the "loading" element is removed from the DOM.
     *
     */
    loading.addEventListener("animationend", function () {
        loading.remove();
    })

    /**
     * Starts the `contar()` function with an interval of 5000ms (5 seconds).
     */
    interval = setInterval(contar, 5000 / 100);
});