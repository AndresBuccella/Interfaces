document.addEventListener("DOMContentLoaded", function () {
    const containers = document.querySelectorAll(".contenedor-carrusel");

    containers.forEach(container => {
        const content = container.querySelector(".carrusel");
        console.log(content)
        const btnLeft = container.querySelector(".boton-izquierda");
        const btnRight = container.querySelector(".boton-derecha");

        let scrollAmount = 0;
        const scrollUnit = 500; // Ajusta esta cantidad según tu preferencia

        btnLeft.addEventListener("click", function () {
            scrollAmount -= scrollUnit;
            scrollContent();
        });

        btnRight.addEventListener("click", function () {
            scrollAmount += scrollUnit;
            scrollContent();
        });

        function scrollContent() {
            let error_margin = -35;
            if (scrollAmount < 0) {
                if (scrollAmount == -scrollUnit) { scrollAmount = content.scrollWidth - container.clientWidth + error_margin; }
                else { scrollAmount = 0; }
            }
            if (scrollAmount > content.scrollWidth - container.clientWidth + error_margin) {
                if (scrollAmount == content.scrollWidth - container.clientWidth + error_margin + scrollUnit) { scrollAmount = 0; }
                else { scrollAmount = content.scrollWidth - container.clientWidth + error_margin; }
            }
            console.log(scrollAmount);
            content.style.transform = `translateX(-${scrollAmount}px)`;
        }
    });
});
