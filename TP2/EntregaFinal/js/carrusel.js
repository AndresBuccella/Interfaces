document.addEventListener("DOMContentLoaded", function () {
    const containers = document.querySelectorAll(".contenedor-carrusel");

    containers.forEach(container => {
        const content = container.querySelector(".carrusel");
        const btnLeft = container.querySelector(".boton-izquierda");
        const btnRight = container.querySelector(".boton-derecha");

        btnLeft.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="234" viewBox="0 0 35 234" fill="none">' +
            '<path fill-rule="evenodd" clip-rule="evenodd"' +
            'd="M35 35C35 15.67 19.33 0 0 0V234C19.33 234 35 218.33 35 199V35ZM6.54795 112.674C4.17306 114.672 4.17306 118.328 6.54795 120.326L20.0312 131.669C23.2835 134.405 28.25 132.093 28.25 127.843V105.157C28.25 100.907 23.2835 98.5946 20.0312 101.331L6.54795 112.674Z"' +
            'fill="#8016B6" /></svg>';

        btnRight.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="234" viewBox="0 0 35 234" fill="none">' +
            '<path fill-rule="evenodd" clip-rule="evenodd"' +
            'd="M0 35C0 15.67 15.67 0 35 0V234C15.67 234 0 218.33 0 199V35ZM28.452 112.674C30.8269 114.672 30.8269 118.328 28.4521 120.326L14.9688 131.669C11.7165 134.405 6.75 132.093 6.75 127.843V105.157C6.75 100.907 11.7165 98.5946 14.9688 101.331L28.452 112.674Z"' +
            'fill="#8016B6" /></svg>'

        //Generado de las cartas
        //En posesion
        function generar_card_posesion(nombre, imagen, generos) {
            let contenido =
                '  <div class="content">' +
                '<img src="images/juegos/' + imagen + '" alt="imagen del juego.jpeg">' +
                '<div class="informacion">' +
                '<p class="nombre-juego">' + nombre + '</p>' +
                '<ul class="categorias">';

            generos.forEach(genero => {
                contenido += '<li>' + genero + '</li>';
            });

            contenido += '</ul>' +
                '</div>' +
                '</div>' +
                '<div class="informacion">' +
                '<p class="nombre-juego">' + nombre + '</p>' +
                '<a href="" class="boton-jugar">Jugar</a>' +
                '</div>';
            let divTemporal = document.createElement('div');
            divTemporal.innerHTML = contenido;
            divTemporal.className = "card";

            return divTemporal
        }
        const cards_posesion = content.querySelectorAll(".card-posesion")
        cards_posesion.forEach(card_posesion => {
            let nombre = card_posesion.getAttribute("data-nombre");
            let imagen = card_posesion.getAttribute("data-imagen");
            let generos = JSON.parse(card_posesion.getAttribute("data-generos"));
            let nuevaetiqueta = generar_card_posesion(nombre, imagen, generos);
            card_posesion.parentNode.replaceChild(nuevaetiqueta, card_posesion);
        });

        //A comprar
        function generar_card_normal(nombre, imagen, generos, precio) {
            let contenido = '<div class="content">' +
                '<img src="images/juegos/' + imagen + '" alt="imagen del juego.jpeg">' +
                '<div class="carrito none"> <img src="images/iconos/carrito_de_compra.png" alt=""></div>'+
                '<div class="informacion">' +
                '<p class="nombre-juego">' + nombre + '</p>' +
                '<div class="categorias-y-boton">' +
                '<ul class="categorias">';
            generos.forEach(genero => {
                contenido += '<li>' + genero + '</li>';
            });

            contenido += '</ul>' +
                '<button class="agregar flex">Agregar <img src="images/iconos/mini-carrito.png" alt="mini carrito.png"></button>' +
                '<button class="agregado none">X<span>Agregado <img src="images/iconos/mini-carrito.png"' +
                'alt="mini carrito.png"></span></button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="informacion">' +
                '<p class="nombre-juego">' + nombre + '</p>' +
                '<p class="precio">$' + precio + '</p>' +
                '</div>'
            let divTemporal = document.createElement('div');
            divTemporal.innerHTML = contenido;
            divTemporal.className = "card";

            return divTemporal
        }
        const cards_normal = content.querySelectorAll(".card-normal")
        cards_normal.forEach(card_normal => {
            let nombre = card_normal.getAttribute("data-nombre");
            let imagen = card_normal.getAttribute("data-imagen");
            let precio = card_normal.getAttribute("data-precio");
            let generos = JSON.parse(card_normal.getAttribute("data-generos"));
            let nuevaetiqueta = generar_card_normal(nombre, imagen, generos, precio);
            card_normal.parentNode.replaceChild(nuevaetiqueta, card_normal);
        });

        //Juntar todas las cartas
        const cards = content.querySelectorAll(".card")

        cards.forEach(card => {
            let btn_agregar = card.querySelector(".agregar");
            let btn_agregado = card.querySelector(".agregado");
            let carrito = card.querySelector(".carrito");

            btn_agregar.addEventListener("click", function () {
                btn_agregar.classList.add("none");
                btn_agregar.classList.remove("flex");
                btn_agregado.classList.add("flex");
                btn_agregado.classList.remove("none");
                carrito.classList.add("flex");
                carrito.classList.remove("none");
            });

            btn_agregado.addEventListener("click", function () {
                btn_agregado.classList.add("none");
                btn_agregado.classList.remove("flex");
                btn_agregar.classList.add("flex");
                btn_agregar.classList.remove("none");
                carrito.classList.add("none");
                carrito.classList.remove("flex");
            });
        });

        let scrollAmount = 0;
        const scrollUnit = content.offsetWidth; // Ajusta esta cantidad según tu preferencia

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
                if (scrollAmount == -scrollUnit) { scrollAmount = content.scrollWidth - content.clientWidth + error_margin; }
                else { scrollAmount = 0; }
            }
            if (scrollAmount > content.scrollWidth - content.clientWidth + error_margin) {
                if (scrollAmount == content.scrollWidth - content.clientWidth + error_margin + scrollUnit) { scrollAmount = 0; }
                else { scrollAmount = content.scrollWidth - content.clientWidth + error_margin; }
            }
            //content.style.transform = `translateX(-${scrollAmount}px)`;
            cards.forEach(card => {
                card.style.transform = `translateX(-${scrollAmount}px)`;
            });
        }
    });
});
